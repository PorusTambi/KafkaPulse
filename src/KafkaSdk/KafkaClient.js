//main package to handle kafka is kafkajs, we can use any other package but this is the most popular one
import {Kafka} from 'kafkajs'
import APP_CONSTANTS from '../APP_CONSTANTS.js'

const {TOPIC_NAMES}=APP_CONSTANTS

//clientId is the name of your application, any name we can give
//brokers are the machines physical or virtual where actual data is stored
//we can have multiple brokers hence an array 
const KafkaClient = new Kafka(
    {
        clientId:'KafkaPulse',
        brokers:['localhost:9092'],
    }
)

console.log('\n Kafka Client initialized successfully! \n')

const KafkaAdmin = KafkaClient.admin()

await KafkaAdmin.connect()

console.log('\n Kafka Admin connected successfully! \n')


await KafkaAdmin.createTopics({
    topics:[
      {topic:TOPIC_NAMES.DEFAULT_PARTITIONING, numPartitions:3},
      {topic:TOPIC_NAMES.KEYED_ORDERED_PARTITIONING, numPartitions:2}
    ]
})





export default KafkaClient
