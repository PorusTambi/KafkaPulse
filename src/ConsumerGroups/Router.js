import express from 'express';
import ConsumerGroupsController from './Controller.js';

const {renderPage,produceMessage, fetchState}= ConsumerGroupsController

const ConsumerGroupsRouter = express.Router();


ConsumerGroupsRouter.get('/', renderPage)
ConsumerGroupsRouter.get('/api/fetch-state', fetchState)
ConsumerGroupsRouter.post('/api/produce-message', produceMessage)


export default ConsumerGroupsRouter