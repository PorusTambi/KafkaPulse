import KeyedOrderedPartitioningModel from "./Model.js";

async function renderPage(req, res, next) {
  const data =  KeyedOrderedPartitioningModel.getDataToRender() 
  const {page=''}= data
  res.render(page);
  next()
}

async function fetchState(req, res, next) {
  const data = KeyedOrderedPartitioningModel.getDataToRender();
  const {state={}}= data  
  res.status(200).json(state);
  next()
}


async function produceMessage(req, res, next) {  
   const messages= await KeyedOrderedPartitioningModel.produceMessage();
    res.status(200).json({messages, count: messages.length})
    next()
}




const KeyedOrderedPartitioningController = {
  renderPage,
  fetchState,
  produceMessage,
}

export default KeyedOrderedPartitioningController