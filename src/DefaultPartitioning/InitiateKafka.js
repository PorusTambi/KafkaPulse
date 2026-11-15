//Initiate Kafka for understanding the given feature

import KafkaAdmin from "../KafkaSdk/KafkaAdmin.js";
import KafkaClient from "../KafkaSdk/KafkaClient.js";
import APP_CONSTANTS from "../APP_CONSTANTS.js";
import KafkaState from "./KafkaState.js";

const { TOPIC_NAMES } = APP_CONSTANTS;

async function InitiateKafka() {


//Topics are just logical grouping of data
//Within topics you can do sub grouping using partitions

//commands to create a topic, here we will create topics using admin 
//docker exec -it <container name> sh
//./opt/kafka/bin/kafka-topics.sh --create --topic system-events --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1


//here we will create topics using admin client
//we create 3 partitions at start    
await KafkaAdmin.createTopics({
    topics:[
      {topic:TOPIC_NAMES.DEFAULT_PARTITIONING, numPartitions:3}
    ]
  })
  
  
  //create and connect producer which will send messages
  const producer = KafkaClient.producer();
  await producer.connect();
  
  
  //create and connect 3 consumer to consume messages
  //consumers are tied to consumer groups we will look later
  //One partition is assigned to one consumer in a consumer group
  //They all share the EXACT SAME groupId. This tells Kafka they are a team. That's what is consumer group
  // 3 Consumers, 1 Group
  const consumerA = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.DEFAULT_PARTITIONING}-group` });
  const consumerB = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.DEFAULT_PARTITIONING}-group` });
  const consumerC = KafkaClient.consumer({ groupId: `${TOPIC_NAMES.DEFAULT_PARTITIONING}-group` });
  await consumerA.connect();
  await consumerB.connect();
  await consumerC.connect();
  

//subscribe consumer to a topic
//from beginning means that the consumer will receive all messages from the beginning of the topic,  
//consumers can subscribe to multiple topics
 await consumerA.subscribe({ topics: [`${TOPIC_NAMES.DEFAULT_PARTITIONING}`], fromBeginning: true });
 await consumerB.subscribe({ topics: [`${TOPIC_NAMES.DEFAULT_PARTITIONING}`], fromBeginning: true });
 await consumerC.subscribe({ topics: [`${TOPIC_NAMES.DEFAULT_PARTITIONING}`], fromBeginning: true });
  
  
  await consumerA.run({ eachMessage: consumerMessageHandler("Consumer A") })
  await consumerB.run({ eachMessage: consumerMessageHandler("Consumer B") })
  await consumerC.run({ eachMessage: consumerMessageHandler("Consumer C") })

  //return the producer to the caller so they can send messages to the topic
  return producer
  
}


const consumerMessageHandler = (consumerName) => {
    return async ({ topic ,partition, message }) => {
        const task = message.value.toString();
      
        KafkaState.consumers[consumerName].partition = partition; // Note which belt they are watching
        KafkaState.partitions[partition].push(task);              // Add to the Storage view
        KafkaState.consumers[consumerName].messages.push(task);   // Add to the Worker view
        KafkaState.latestTask = task;                             // Flag for yellow highlight

      console.log(`Topic: ${topic}, Partition: ${partition}], ConsumerName: ${consumerName}, Message: ${task}`);
    };
};
 

export default InitiateKafka;