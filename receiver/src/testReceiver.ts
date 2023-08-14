import {RabbitProducer} from './queue/rabbitProducer.js';
import dotenv from 'dotenv';
import * as crypto from "crypto";

dotenv.config();
const USER = process.env.RABBIT_USER;
const PASS = process.env.RABBIT_PASS;
const HOST = process.env.RABBIT_HOST;


const url = `amqp://${USER}:${PASS}@${HOST}`;
const queue = new RabbitProducer(url);

const TASK_QUEUE = 'task_queue'
const RESULT_QUEUE = 'result_queue'

async function main () {
  const userData = {
    item_id: "macbook",
    text: "This is a sample message to send receiver to check the ordered Item Availablility",
  };

  const userStringData = JSON.stringify(userData)

  await queue.connect()

  let uniqueMessageId = '1'
  for (let i=0; i < 10; i++) {
    await queue.sendMessageToQueue(RESULT_QUEUE, userStringData, uniqueMessageId);
    uniqueMessageId = crypto.randomUUID()
  }



  // const myId = '1'
  // const result = await queue.returnMessageFromQueueById(RESULT_QUEUE, myId)
  // console.log(`MAIN RESULT ${result.properties.correlationId}`)

  await queue.closeConnection()
}

await main()
