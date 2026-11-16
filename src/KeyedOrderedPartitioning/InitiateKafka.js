//Initiate Kafka for understanding the given feature
import KafkaClient from "../KafkaSdk/KafkaClient.js";
import APP_CONSTANTS from "../APP_CONSTANTS.js";
import KafkaState from "./KafkaState.js";

const { TOPIC_NAMES } = APP_CONSTANTS;

async function InitiateKafka() {

  //here we already created topic with 2 partitions using admin client in file KafkaClient.js
  const producer = KafkaClient.producer({
    allowAutoTopicCreation: false,
  });
  await producer.connect();
  
  
  //create and connect 2 consumer to consume messages
  const consumerA = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.KEYED_ORDERED_PARTITIONING}-group` });
  const consumerB = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.KEYED_ORDERED_PARTITIONING}-group` });
  await consumerA.connect();
  await consumerB.connect();
  

//subscribe consumer to a topic
 await consumerA.subscribe({ topics: [`${TOPIC_NAMES.KEYED_ORDERED_PARTITIONING}`], fromBeginning: true });
 await consumerB.subscribe({ topics: [`${TOPIC_NAMES.KEYED_ORDERED_PARTITIONING}`], fromBeginning: true });
  
  
  await consumerA.run({ eachMessage: consumerMessageHandler("Consumer A") })
  await consumerB.run({ eachMessage: consumerMessageHandler("Consumer B") })
  //return the producer to the caller so they can send messages to the topic
  return producer
  
}


const consumerMessageHandler = (consumerName) => {
    return async ({ topic ,partition, message }) => {
        const event = JSON.parse(message.value.toString());
      
        KafkaState.consumers[consumerName].partition = partition; // Note which belt they are watching
        KafkaState.partitions[partition].push(event);              // Add to the Storage view
        KafkaState.consumers[consumerName].messages.push(event);   // Add to the Worker view

      console.log(`Topic: ${topic}, Partition: ${partition}], ConsumerName: ${consumerName}, got message`, event);
    }
}
 

export default InitiateKafka;