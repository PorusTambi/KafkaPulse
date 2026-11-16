import InitiateKafka from "./InitiateKafka.js";
import KafkaState from "./KafkaState.js";

import APP_CONSTANTS from "../APP_CONSTANTS.js";

const {TOPIC_NAMES}= APP_CONSTANTS

//weird keys as in  MurmurHash(key)%2 was hashing 1,2 to same partition
const matches = {
  1:'India-vs-NewZealand',
  2:'Australia-vs-England'
}

const matchesData = [
 {matchId:'1', text:'Virat Kohli hit a six'},
 {matchId:'2', text:'Steve Smith hit a four'},
 {matchId:'1', text:'Mitchell Santner bowled a googly, Rohit Sharma got out'},
 {matchId:'2', text:'Jofra archer bowled out Steve smith'},
 {matchId:'1', text:'Virat Kohli took a single and got run out'},
 {matchId:'2', text:'David Warner hit a six'}
]

const producer = await InitiateKafka()

function getDataToRender() {
  return {
    page:TOPIC_NAMES.KEYED_ORDERED_PARTITIONING,
    state:KafkaState
  }
 }


async function produceMessage() {
//each message has a key and value
//key tells which partition to send the message to
//kafka has a hash function murmur2 and hash messages bases key to a partition
//messages in a partition are ordered according to timestamp


//increment event counter
KafkaState.eventCounter+=1


const matchEvent = matchesData[KafkaState.eventCounter-1];

const messageKey = matchesData[KafkaState.eventCounter-1].matchId


const messageData = {
  id:KafkaState.eventCounter,
  time:new Date().toISOString(),
  text: matchEvent.text,
  matchName:matches[messageKey]
}



const messages = [
  {
   key:messageKey, //this is the key basis which parttition happens using MurmurHash(key) % partitions
    value:JSON.stringify(messageData)
  }
]

//sending message, we can send multiple here as well
await producer.send({
 topic:TOPIC_NAMES.KEYED_ORDERED_PARTITIONING,
 messages
})

console.log(`Produced: message in Topic:${TOPIC_NAMES.KEYED_ORDERED_PARTITIONING}`,messageData)
return messages

}



const KeyedOrderedPartitioningModel = {  
    getDataToRender,
    produceMessage,
}

export default KeyedOrderedPartitioningModel;