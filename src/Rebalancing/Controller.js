import RebalancingModel from "./Model.js";

async function renderPage(req, res, next) {
  const data = RebalancingModel.getDataToRender()
  const { page = '' } = data
  res.render(page);
  next()
}

async function fetchState(req, res, next) {
  const data = RebalancingModel.getDataToRender();
  const { state = {} } = data
  res.status(200).json(state);
  next()
}


async function produceMessage(req, res, next) {
  const messages = await RebalancingModel.produceMessage();
  res.status(200).json({ messages, count: messages.length })
  next()
}

async function disconnectConsumerA(req, res, next) {
  await RebalancingModel.disconnectConsumerA();
  res.status(200).json({ message: "Consumer A disconnected" })
  next()
}




const RebalancingController = {
  renderPage,
  fetchState,
  produceMessage,
  disconnectConsumerA
}

export default RebalancingController