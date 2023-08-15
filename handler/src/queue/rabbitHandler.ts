import ampq, {Channel, Connection, ConsumeMessage} from 'amqplib';
import {serializeUserMessageData} from '../utils/utils.js';

export class RabbitHandler {
  private connection: Connection | null = null;

  constructor(private readonly url: string) {
    this.url = url;
  }

  async connect(): Promise<void> {
    try {
      this.connection = await ampq.connect(this.url);
    } catch (err) {
      console.log(`Cannot connect to ${this.url}`);
      throw err;
    }
  }

  async handleMessagesFromQueue(
    queueReceive: string,
    queueBack: string,
    handler: HandlerFunction
  ): Promise<ConsumeMessage> {
    if (!this.connection) {
      throw Error('Not connected to Rabbit');
    }
    const channel: Channel = await this.connection.createChannel();

    await channel.assertQueue(queueReceive, {
      durable: false,
    });

    const message: Promise<ConsumeMessage> = new Promise<ConsumeMessage>(
      (resolve, reject) => {
        channel.consume(
          queueReceive,
          async (rabbitMessage: ampq.ConsumeMessage | null) => {
            if (rabbitMessage) {
              const message = rabbitMessage.content.toString();
              console.log(message);
              const uniqueMessageId: string =
                rabbitMessage.properties.correlationId;
              const userData: ProceedUserData =
                await serializeUserMessageData(message);
              const handlerResult: ResultUserData = await handler(userData);
              if (!handlerResult?.error) {
                const userResponse: string = JSON.stringify(handlerResult);
                await this.sendMessageToQueue(
                  queueBack,
                  userResponse,
                  uniqueMessageId
                );
                console.log(
                  `Message ${message} was sent back to receiver with info ${userResponse}`
                );
              } else {
                await this.sendMessageToQueue(
                  queueBack,
                  handlerResult.error,
                  uniqueMessageId
                );
              }
            }
          },
          {noAck: true}
        );
      }
    );
    channel.ack(await message);
    return message;
  }

  async sendMessageToQueue(
    queueName: string,
    message: string,
    uniqueMessageId: string
  ): Promise<void> {
    if (!this.connection) {
      throw Error('Not connected to Rabbit');
    }
    const channel: Channel = await this.connection.createChannel();

    const {queue} = await channel.assertQueue(queueName, {durable: false});

    channel.sendToQueue(queueName, Buffer.from(message), {
      correlationId: uniqueMessageId,
      replyTo: queue,
    });
    console.log(`${message} was sent to ${queueName}`);
  }

  async closeConnection() {
    if (!this.connection) {
      throw Error('Not connected to Rabbit');
    }
    await this.connection.close();
  }
}
