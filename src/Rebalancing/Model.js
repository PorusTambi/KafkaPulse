import InitiateKafka from "./InitiateKafka.js";
import KafkaState from "./KafkaState.js";

import APP_CONSTANTS from "../APP_CONSTANTS.js";

const { TOPIC_NAMES } = APP_CONSTANTS



const { producer, consumerA } = await InitiateKafka()

function getDataToRender() {
  return {
    page: TOPIC_NAMES.REBALANCING,
    state: KafkaState
  }
}


async function produceMessage() {

  //increment task counter
  KafkaState.taskCounter += 1

  const messages = [{ value: `Task #${KafkaState.taskCounter}` }]
  //sending message, we can send multiple here as well
  await producer.send({
    topic: TOPIC_NAMES.REBALANCING,
    messages
  })


  console.log(`Produced: message:${messages[0].value} Topic:${TOPIC_NAMES.DEFAULT_PARTITIONING}`)
  return messages

}

async function disconnectConsumerA() {

  //auto rebalcing will happen when we disconnect a consumer, so we can see the effect of rebalancing in the UI
  await consumerA.disconnect();
}



const RebalancingModel = {
  getDataToRender,
  produceMessage,
  disconnectConsumerA
}

export default RebalancingModel;