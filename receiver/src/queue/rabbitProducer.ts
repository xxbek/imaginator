import ampq, {Channel, Connection, ConsumeMessage} from 'amqplib';
import * as crypto from "crypto";

export class RabbitProducer {
  private connection: Connection | null=null;
  private channel: Channel | null=null;

  constructor(private readonly url: string) {
    this.url = url;
  }

  async connect(): Promise<void> {
    try {
      this.connection = await ampq.connect(this.url);
      this.channel = await this.connection.createChannel();
    } catch (err) {
    console.log(`Cannot connect to ${this.url}`);
    throw err;
    }
  }

  async sendMessageToQueue(queueName: string, message: string): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not connected.');
    }

    const { queue } = await this.channel.assertQueue(queueName, {
      durable: false,
    });
    const uniqueMessageId = crypto.randomUUID()

    this.channel.sendToQueue(queueName, Buffer.from(message), {
      correlationId: uniqueMessageId,
      replyTo: queue,
    });
    console.log(`${message} was sent to ${queueName}`);
    await this.channel.close()
  }

  async returnMessageFromQueue(queueName: string): Promise<ConsumeMessage> {
    if (!this.channel) {
      throw new Error('Channel is not connected.');
    }

    await this.channel.assertQueue(queueName, {
      durable: false,
    });

    const message =  new Promise<ConsumeMessage>((resolve, reject) => {
      this.channel.consume(
        queueName,
        (msg) => {
          if (msg) {
            const message = msg.content.toString(); // Преобразование буфера в строку
            console.log(`Received: ${message}`);
            resolve(msg); // Вернуть текст сообщения из промиса
          }
        },
        { noAck: true }
      );

    });
    await channel.close();
    return message
  }

  async closeConnection() {
    this.connection?.close()
  }
}


