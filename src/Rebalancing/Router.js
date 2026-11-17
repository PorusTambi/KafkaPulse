import express from 'express';
import RebalancingController from './Controller.js';

const { renderPage, produceMessage, fetchState, disconnectConsumerA } = RebalancingController

const RebalancingRouter = express.Router();


RebalancingRouter.get('/', renderPage)
RebalancingRouter.get('/api/fetch-state', fetchState)
RebalancingRouter.post('/api/produce-message', produceMessage)
RebalancingRouter.post('/api/disconnect-consumerA', disconnectConsumerA)


export default RebalancingRouter