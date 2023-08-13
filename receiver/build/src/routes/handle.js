import Router from 'express';
import { RabbitProducer } from '../queue/rabbitProducer';
const handleRouter = Router();
handleRouter.post('/send', (req, res) => {
    const queue = new RabbitProducer('amqp://localhost');
});
export { handleRouter };
//# sourceMappingURL=handle.js.map