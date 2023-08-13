import Router, {Express, Request, Response} from 'express'
import {RabbitProducer} from '../queue/rabbitProducer'

const handleRouter: Express = Router();

handleRouter.post('/send', (req: Request, res: Response) => {
  const queue = new RabbitProducer('amqp://localhost');
}
)

export { handleRouter }
