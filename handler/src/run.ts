import {RabbitHandler} from './queue/rabbitHandler.js';
import dotenv from 'dotenv';
import {customHandler} from './handlers/handlers.js';

dotenv.config();
const USER = process.env.RABBIT_USER;
const PASS = process.env.RABBIT_PASS;
const HOST = process.env.RABBIT_HOST;

const TASK_QUEUE = 'task_queue';
const RESULT_QUEUE = 'result_queue';

const URL = `amqp://${USER}:${PASS}@${HOST}`;

async function main() {
  const queue: RabbitHandler = new RabbitHandler(URL);
  console.log(USER, PASS, HOST)
  await queue.connect();
  await queue.handleMessagesFromQueue(TASK_QUEUE, RESULT_QUEUE, customHandler);
}

await main();
