import ConsumerGroupsModel from "./Model.js";

async function renderPage(req, res, next) {
  const data =  ConsumerGroupsModel.getDataToRender() 
  const {page=''}= data
  res.render(page);
  next()
}

async function fetchState(req, res, next) {
  const data = ConsumerGroupsModel.getDataToRender();
  const {state={}}= data  
  res.status(200).json(state);
  next()
}


async function produceMessage(req, res, next) {  
   const messages= await ConsumerGroupsModel.produceMessage();
    res.status(200).json({messages, count: messages.length})
    next()
}




const ConsumerGroupsController = {
  renderPage,
  fetchState,
  produceMessage,
}

export default ConsumerGroupsController