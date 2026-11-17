import ResumingMessagesModel from "./Model.js";

async function renderPage(req, res, next) {
  const data = ResumingMessagesModel.getDataToRender()
  const { page = '' } = data
  res.render(page);
  next()
}

async function fetchState(req, res, next) {
  const data = ResumingMessagesModel.getDataToRender();
  const { state = {} } = data
  res.status(200).json(state);
  next()
}


async function produceMessage(req, res, next) {
  const messages = await ResumingMessagesModel.produceMessage();
  res.status(200).json({ messages, count: messages.length })
  next()
}

async function disconnectConsumerA(req, res, next) {
  await ResumingMessagesModel.disconnectConsumerA();
  res.status(200).json({ message: "Consumer A disconnected" })
  next()
}

async function connectNewConsumer(req, res, next) {
  await ResumingMessagesModel.connectNewConsumer();
  res.status(200).json({ message: "Consumer B connected" })
  next()
}



const ResumingMessagesController = {
  renderPage,
  fetchState,
  produceMessage,
  disconnectConsumerA,
  connectNewConsumer
}

export default ResumingMessagesController