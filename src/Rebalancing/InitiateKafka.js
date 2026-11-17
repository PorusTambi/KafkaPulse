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


  const consumerA = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.REBALANCING}-group` });
  const consumerB = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.REBALANCING}-group` });
  await consumerA.connect();
  await consumerB.connect();


  //subscribe consumer to a topic
  //from beginning means that the consumer will receive all messages from the beginning of the topic,  
  //consumers can subscribe to multiple topics
  await consumerA.subscribe({ topics: [`${TOPIC_NAMES.REBALANCING}`], fromBeginning: true });
  await consumerB.subscribe({ topics: [`${TOPIC_NAMES.REBALANCING}`], fromBeginning: true });


  await consumerA.run({ eachMessage: consumerMessageHandler("Consumer A") })
  await consumerB.run({ eachMessage: consumerMessageHandler("Consumer B") })

  //return the producer to the caller so they can send messages to the topic
  return { producer, consumerA, consumerB }

}


const consumerMessageHandler = (consumerName) => {
  return async ({ topic, partition, message }) => {
    const task = message.value.toString();

    KafkaState.consumers[consumerName].partition = partition; // Note which belt they are watching
    KafkaState.partitions[partition].push(task);              // Add to the Storage view
    KafkaState.consumers[consumerName].messages.push(task);   // Add to the Worker view
    KafkaState.latestTask = task;                             // Flag for yellow highlight

    console.log(`Topic: ${topic}, Partition: ${partition}], ConsumerName: ${consumerName}, Message: ${task}`);
  }
}


export default InitiateKafka;