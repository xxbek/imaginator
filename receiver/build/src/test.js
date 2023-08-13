import { RabbitProducer } from './queue/rabbitProducer.js';
import dotenv from 'dotenv';
dotenv.config();
const USER = process.env.RABBIT_USER;
const PASS = process.env.RABBIT_PASS;
const HOST = process.env.RABBIT_HOST;
const url = `amqp://${USER}:${PASS}@${HOST}`;
const queue = new RabbitProducer(url);
async function main() {
    await queue.sendMessageToQueue('myQueue', 'Hello rabbit');
}
await main();
//# sourceMappingURL=test.js.map