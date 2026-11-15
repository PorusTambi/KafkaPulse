import express from 'express';
import DefaultPartitioningController from './Controller.js';

const {renderPage,produceMessage, fetchState}= DefaultPartitioningController

const DefaultPartitioningRouter = express.Router();


DefaultPartitioningRouter.get('/', renderPage)
DefaultPartitioningRouter.get('/api/fetch-state', fetchState)
DefaultPartitioningRouter.post('/api/produce-message', produceMessage)


export default DefaultPartitioningRouter