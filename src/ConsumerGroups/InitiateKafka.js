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


  //create 2 different consumer groups, each consumer group will have 2 consumer
  // 3 Consumers, 1 Group
  const consumerA = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.CONSUMER_GROUPS}-group-1` });
  const consumerB = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.CONSUMER_GROUPS}-group-1` });

  const consumerC = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.CONSUMER_GROUPS}-group-2` });
  const consumerD = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.CONSUMER_GROUPS}-group-2` });

  await consumerA.connect();
  await consumerB.connect();

  await consumerC.connect();
  await consumerD.connect();


  await consumerA.subscribe({ topics: [`${TOPIC_NAMES.CONSUMER_GROUPS}`], fromBeginning: true });
  await consumerB.subscribe({ topics: [`${TOPIC_NAMES.CONSUMER_GROUPS}`], fromBeginning: true });

  await consumerC.subscribe({ topics: [`${TOPIC_NAMES.CONSUMER_GROUPS}`], fromBeginning: true });
  await consumerD.subscribe({ topics: [`${TOPIC_NAMES.CONSUMER_GROUPS}`], fromBeginning: true });


  await consumerA.run({ eachMessage: consumerMessageHandler("Consumer A-1") })
  await consumerB.run({ eachMessage: consumerMessageHandler("Consumer B-1") })

  await consumerC.run({ eachMessage: consumerMessageHandler("Consumer C-2") })
  await consumerD.run({ eachMessage: consumerMessageHandler("Consumer D-2") })


  //return the producer to the caller so they can send messages to the topic
  return producer

}


const consumerMessageHandler = (consumerString) => {
  return async ({ topic, partition, message }) => {
    const task = JSON.parse(message.value.toString());

    const [name, group] = consumerString.split('-')

    KafkaState.consumers[group][name].partition = partition; // Note which belt they are watching


    //push in partition state for 1 group only, otherwise In UI you see 2
    if (group === '1') { KafkaState.partitions[partition].push(task); }           // Add to the Storage view

    KafkaState.consumers[group][name].messages.push(task);   // Add to the Worker view
    KafkaState.latestTask = task.id;                             // Flag for yellow highlight

    console.log(`Topic: ${topic}, Partition: ${partition}, ConsumerGroup: ${group}, ConsumerName: ${name}, got message`, task);
  }
}


export default InitiateKafka;