import express, {Express} from 'express';
import dotenv from 'dotenv';
import {handleRouter} from './routes/handle.js';

const PORT = process.env.PORT;
dotenv.config();



const app: Express = express();
app.use('/handle', handleRouter);



app.listen(PORT, () => {
  console.log('Server is running..');
});
