//Initiate Kafka for understanding the given feature

import KafkaClient from "../KafkaSdk/KafkaClient.js";
import APP_CONSTANTS from "../APP_CONSTANTS.js";
import KafkaState from "./KafkaState.js";

const { TOPIC_NAMES } = APP_CONSTANTS;

async function InitiateKafka() {


  //create and connect producer which will send messages
  const producer = KafkaClient.producer({
    allowAutoTopicCreation: false //auto topic creation is disabled, we will create topics using admin client
  })

  await producer.connect();


  const consumerA = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.RESUMING_MESSAGES}-group` });
  await consumerA.connect();


  //subscribe consumer to a topic
  await consumerA.subscribe({ topics: [`${TOPIC_NAMES.RESUMING_MESSAGES}`], fromBeginning: true });
  await consumerA.run({ eachMessage: consumerMessageHandler("Consumer A") })

  //return the producer to the caller so they can send messages to the topic
  return { producer, consumerA }

}


const consumerMessageHandler = (consumerName) => {
  return async ({ topic, partition, message }) => {
    const task = message.value.toString();

    KafkaState.consumers[consumerName].partition = partition; // Note which belt they are watching              // Add to the Storage view
    KafkaState.consumers[consumerName].messages.push(task);
    KafkaState.latestTask = task;                             // Flag for yellow highlight

    console.log(`Topic: ${topic}, Partition: ${partition}], ConsumerName: ${consumerName}, Message: ${task}`);
  }
}


export { InitiateKafka, consumerMessageHandler };