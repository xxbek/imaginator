import express, {Express} from 'express';
import dotenv from 'dotenv';
import {handleRouter} from './routes/handle.js';

dotenv.config();
const PORT = process.env.PORT;
const USER = process.env.RABBIT_USER;
const PASS = process.env.RABBIT_PASS;
const HOST = process.env.RABBIT_HOST;

export const RABBIT_URL = `amqp://${USER}:${PASS}@${HOST}`;
export const TASK_QUEUE = 'task_queue';
export const RESULT_QUEUE = 'result_queue';

const app: Express = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/handle', handleRouter);


app.listen(PORT, () => {
  console.log('Server is running..');
});
