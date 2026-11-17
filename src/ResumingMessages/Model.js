import { InitiateKafka, consumerMessageHandler } from "./InitiateKafka.js";
import KafkaState from "./KafkaState.js";
import KafkaClient from "../KafkaSdk/KafkaClient.js";

import APP_CONSTANTS from "../APP_CONSTANTS.js";

const { TOPIC_NAMES } = APP_CONSTANTS



const { producer, consumerA } = await InitiateKafka()

function getDataToRender() {
  return {
    page: TOPIC_NAMES.RESUMING_MESSAGES,
    state: KafkaState
  }
}


async function produceMessage() {

  //increment task counter
  KafkaState.taskCounter += 1

  const messages = [{ value: `Task #${KafkaState.taskCounter}` }]
  //sending message, we can send multiple here as well
  await producer.send({
    topic: TOPIC_NAMES.RESUMING_MESSAGES,
    messages
  })

  //since there is a single partition, we can push the message to the partition array in KafkaState
  KafkaState.partitions[0].push(messages[0].value);


  console.log(`Produced: message:${messages[0].value} Topic:${TOPIC_NAMES.RESUMING_MESSAGES}`)
  return messages

}

async function disconnectConsumerA() {
  await consumerA.disconnect();
}

async function connectNewConsumer() {
  const consumerB = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.RESUMING_MESSAGES}-group` });
  await consumerB.connect();
  //don't include fromBeginning field as we want to resume from where consumerA left off
  await consumerB.subscribe({ topics: [`${TOPIC_NAMES.RESUMING_MESSAGES}`] });
  await consumerB.run({ eachMessage: consumerMessageHandler("Consumer B") })
}



const ResumingMessagesModel = {
  getDataToRender,
  produceMessage,
  disconnectConsumerA,
  connectNewConsumer
}

export default ResumingMessagesModel;