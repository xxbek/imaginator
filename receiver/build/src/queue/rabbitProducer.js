import ampq from 'amqplib';
import * as crypto from "crypto";
export class RabbitProducer {
    url;
    constructor(url) {
        this.url = url;
    }
    async createChannel() {
        try {
            const conn = await ampq.connect(this.url);
            return await conn.createChannel();
        }
        catch (err) {
            console.log(`Cannot connect to ${this.url}`);
            throw err;
        }
    }
    async sendMessageToQueue(queueName, message) {
        const channel = await this.createChannel();
        const { queue } = await channel.assertQueue(queueName, {
            durable: false,
        });
        const uniqueMessageId = crypto.randomUUID();
        channel.sendToQueue(queueName, Buffer.from(message), {
            correlationId: uniqueMessageId,
            replyTo: queue,
        });
        console.log(`${message} was sent to ${queueName}`);
        await channel.close();
    }
    async returnMessageFromQueue(queueName) {
        const channel = await this.createChannel();
        await channel.assertQueue(queueName, {
            durable: false,
        });
        const message = new Promise((resolve, reject) => {
            channel.consume(queueName, (msg) => {
                if (msg) {
                    const message = msg.content.toString(); // Преобразование буфера в строку
                    console.log(`Received: ${message}`);
                    resolve(msg); // Вернуть текст сообщения из промиса
                }
            }, { noAck: true });
        });
        await channel.close();
        return message;
    }
}
//# sourceMappingURL=rabbitProducer.js.map