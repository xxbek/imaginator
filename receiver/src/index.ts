import express, {Express} from 'express';
import dotenv from 'dotenv';
import {handleRouter} from './routes/handle.js';
import {RabbitProducer} from "./queue/rabbitProducer.js";

dotenv.config();
const USER = process.env.RABBIT_USER;
const PASS = process.env.RABBIT_PASS;
const HOST = process.env.RABBIT_HOST;
const PORT = process.env.PORT;


const url = `amqp://${USER}:${PASS}@${HOST}`;
const queue = new RabbitProducer(url);

async function main () {
  const message = await queue.returnMessageFromQueue('myQueue');
  console.log(`YES! ${message}`)
}

await main()


// const app: Express = express();
// app.use('/handle', handleRouter);
//
//
//
// app.listen(PORT, () => {
//   console.log('Server is running..');
// });
