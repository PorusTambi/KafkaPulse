//main package to handle kafka is kafkajs, we can use any other package but this is the most popular one
import {Kafka} from 'kafkajs'

//clientId is the name of your application, any name we can give
//brokers are the machines physical or virtual where actual data is stored
//we can have multiple brokers hence an array 
const kafkaClient = new Kafka(
    {
        clientId:'KafkaPulse',
        brokers:['localhost:9092']
    }
)

export default kafkaClient
