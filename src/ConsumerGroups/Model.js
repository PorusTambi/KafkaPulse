import InitiateKafka from "./InitiateKafka.js";
import KafkaState from "./KafkaState.js";

import APP_CONSTANTS from "../APP_CONSTANTS.js";

const { TOPIC_NAMES } = APP_CONSTANTS

const data = [
  { "id": 1, "text": "U-882: LOGIN_SUCCESS (iPhone_13, Mumbai)" },
  { "id": 2, "text": "U-882: VIEW_ITEM (LAPTOP-X1, Electronics)" },
  { "id": 3, "text": "U-882: ADD_TO_CART (LAPTOP-X1, Electronics)" },
  { "id": 4, "text": "U-882: UPDATE_PASSWORD (Method: Email_Link)" },
  { "id": 5, "text": "U-882: ADD_NEW_CARD (Visa, HDFC Bank)" },
  { "id": 6, "text": "U-882: CHECKOUT_ATTEMPT (₹1,45,000, PENDING)" }
]



const producer = await InitiateKafka()

function getDataToRender() {
  return {
    page: TOPIC_NAMES.CONSUMER_GROUPS,
    state: KafkaState
  }
}


async function produceMessage() {

  KafkaState.taskCounter += 1

  const messageData = data[KafkaState.taskCounter - 1]

  const messages = [{ value: JSON.stringify(messageData) }]
  //sending message, we can send multiple here as well
  await producer.send({
    topic: TOPIC_NAMES.CONSUMER_GROUPS,
    messages
  })


  console.log(`Produced message in Topic:${TOPIC_NAMES.CONSUMER_GROUPS}`, messageData)
  return messages

}



const ConsumerGroupsModel = {
  getDataToRender,
  produceMessage,
}

export default ConsumerGroupsModel;