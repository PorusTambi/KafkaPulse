//main package to handle kafka is kafkajs, we can use any other package but this is the most popular one
import {Kafka} from 'kafkajs'

//clientId is the name of your application, any name we can give
//brokers are the machines physical or virtual where actual data is stored
//we can have multiple brokers hence an array 
const KafkaClient = new Kafka(
    {
        clientId:'KafkaPulse',
        brokers:['localhost:9092'],
        metadataMaxAge: 2000
    }
)

console.log('\n Kafka Client initialized successfully! \n')

export default KafkaClient
