import {RabbitProducer} from './queue/rabbitProducer.js';
import dotenv from 'dotenv';


dotenv.config();
const USER = process.env.RABBIT_USER;
const PASS = process.env.RABBIT_PASS;
const HOST = process.env.RABBIT_HOST;

const url = `amqp://${USER}:${PASS}@${HOST}`;
const queue = new RabbitProducer(url);

const TASK_QUEUE = 'task_queue';
const RESULT_QUEUE = 'result_queue';

async function main() {
  await queue.connect();
  console.log(USER)
  let uniqueMessageId = '1';
  for (let i = 5; i < 15; i++) {
    const userData = {
      item_id: 'macbook',
      proceedNum: i,
    };

    const userStringData = JSON.stringify(userData);

    await queue.sendMessageToQueue(
      TASK_QUEUE,
      userStringData,
      uniqueMessageId
    );
    // uniqueMessageId = crypto.randomUUID();
  }

  const myId = '1'
  const result = await queue.returnMessageFromQueueById(RESULT_QUEUE, myId)
  console.log(`MAIN RESULT ${result}`)

  await queue.closeConnection();
}

await main();
