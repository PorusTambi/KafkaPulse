import express from 'express';
import ResumingMessagesController from './Controller.js';

const { renderPage, produceMessage, fetchState, disconnectConsumerA, connectNewConsumer } = ResumingMessagesController

const ResumingMessagesRouter = express.Router();


ResumingMessagesRouter.get('/', renderPage)
ResumingMessagesRouter.get('/api/fetch-state', fetchState)
ResumingMessagesRouter.post('/api/produce-message', produceMessage)
ResumingMessagesRouter.post('/api/disconnect-consumerA', disconnectConsumerA)
ResumingMessagesRouter.post('/api/connect-new-consumer', connectNewConsumer)


export default ResumingMessagesRouter