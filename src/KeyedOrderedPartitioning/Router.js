import express from 'express';
import KeyedOrderedPartitioningController from './Controller.js';

const {renderPage,produceMessage, fetchState}= KeyedOrderedPartitioningController

const KeyedOrderedPartitioningRouter = express.Router();


KeyedOrderedPartitioningRouter.get('/', renderPage)
KeyedOrderedPartitioningRouter.get('/api/fetch-state', fetchState)
KeyedOrderedPartitioningRouter.post('/api/produce-message', produceMessage)


export default KeyedOrderedPartitioningRouter