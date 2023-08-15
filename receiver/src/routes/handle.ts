import Router, {Express, Request, Response} from 'express';
import {getDataFromHandler} from "../controllers/handleController.js";

const handleRouter: Express = Router();

handleRouter.post('/send', getDataFromHandler);

export {handleRouter};
