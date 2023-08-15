import {Request, Response} from "express";
import {serializeRequestToMessage} from "../utils/serializers.js";
import {generateUniqueId, prepareResponse} from "../utils/utils.js";
import {RabbitProducer} from "../queue/rabbitProducer.js";
import {RABBIT_URL, RESULT_QUEUE, TASK_QUEUE} from "../app.js";

export const getDataFromHandler = async (req:Request, res:Response) => {
  const messageData: ProceedUserData | null = await serializeRequestToMessage(req.body)
  if (messageData) {
    const uniqueMessageId:string = await generateUniqueId()
    const queue: RabbitProducer = new RabbitProducer(RABBIT_URL);
    await queue.connect()
    const stringMessageData = JSON.stringify(messageData)
    await queue.sendMessageToQueue(TASK_QUEUE, stringMessageData, uniqueMessageId)
    const resultFromHandler:ResultFromQueue = await queue.returnMessageFromQueueById(RESULT_QUEUE, uniqueMessageId)
    await queue.closeConnection()
    const responseBody = await prepareResponse(resultFromHandler)
    res.status(200).send(responseBody)
  } else {
    res.status(400).send(`Invalid data structure: "proceedNum" is empty: "${req.body}"`)
  }
}

