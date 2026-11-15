import DefaultPartitioningModel from "./Model.js";

async function renderPage(req, res, next) {
  const data =  DefaultPartitioningModel.getDataToRender() 
  const {page=''}= data
  res.render(page);
  next()
}

async function fetchState(req, res, next) {
  const data = DefaultPartitioningModel.getDataToRender();
  const {state={}}= data  
  res.status(200).json(state);
  next()
}


async function produceMessage(req, res, next) {  
   const messages= await DefaultPartitioningModel.produceMessage();
    res.status(200).json({messages, count: messages.length})
    next()
}




const DefaultPartitioningController = {
  renderPage,
  fetchState,
  produceMessage,
}

export default DefaultPartitioningController