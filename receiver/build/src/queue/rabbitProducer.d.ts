import { ConsumeMessage } from 'amqplib';
export declare class RabbitProducer {
    private readonly url;
    constructor(url: string);
    private createChannel;
    sendMessageToQueue(queueName: string, message: string): Promise<void>;
    returnMessageFromQueue(queueName: string): Promise<ConsumeMessage>;
}
