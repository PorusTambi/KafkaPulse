import InitiateKafka from "./InitiateKafka.js";
import KafkaState from "./KafkaState.js";

import APP_CONSTANTS from "../APP_CONSTANTS.js";

const {TOPIC_NAMES}= APP_CONSTANTS



const producer = await InitiateKafka()

function getDataToRender() {
  return {
    page:TOPIC_NAMES.DEFAULT_PARTITIONING,
    state:KafkaState
  }
 }


async function produceMessage() {
//each message has a key and value
//key tells which partition to send the message to

//if we give no key for now, Kafka will use some default algo to divide messages evenly across partitions
//default partitioning algo is round robin algo
//to optimize round robin algo
//instead of going 1 by 1 message to each partition
//it sends a batch of messages to each partition
//kafka picks a batch size push it to partition1
//then picks another batch size and pushes it to partition2 and so on, 


//increment task counter
KafkaState.taskCounter+=1

const messages = [{ value: `Task #${KafkaState.taskCounter}` }]
//sending message, we can send multiple here as well
await producer.send({
 topic:TOPIC_NAMES.DEFAULT_PARTITIONING,
 messages
})


console.log(`Produced: message:${messages[0].value} Topic:${TOPIC_NAMES.DEFAULT_PARTITIONING}`)
return messages

}



const DefaultPartitioningModel = {  
    getDataToRender,
    produceMessage,
}

export default DefaultPartitioningModel;