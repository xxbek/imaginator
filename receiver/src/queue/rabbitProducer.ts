import ampq, {Channel, Connection} from 'amqplib';

export class RabbitProducer {
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
    console.log(`"${message}" was sent to ${queueName}`);
    await channel.close();
  }

  async returnMessageFromQueueById(
    queueName: string,
    uniqueMessageId: string
  ): Promise<ResultFromQueue> {
    if (!this.connection) {
      throw Error('Not connected to Rabbit');
    }
    const channel: Channel = await this.connection.createChannel();

    await channel.assertQueue(queueName, {
      durable: false,
    });
    // await this.channel.prefetch(1)

    const message = new Promise<ampq.ConsumeMessage | null>(
      (resolve, reject) => {
        channel.consume(
          queueName,
          (rabbitMessage: ampq.ConsumeMessage | null) => {
            if (rabbitMessage) {
              if (rabbitMessage.properties.correlationId === uniqueMessageId) {
                resolve(rabbitMessage);
              }
            }
          }
        );
      }
    );

    const receivedMessage = await message;

    if (receivedMessage) {
      channel.ack(receivedMessage);
    } else {
      throw Error;
    }
    await channel.close();

    const stringMessage = receivedMessage.content.toString();
    return JSON.parse(stringMessage);
  }

  async closeConnection() {
    this.connection?.close();
  }
}
