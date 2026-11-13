import kafkaClient from "./kafkaClient.js"

//Consumer group can have multiple consumers,each consumer in the group will get a subset of messages from the topic
const consumer = kafkaClient.consumer({groupId:'system-events-consumer-group'})

await consumer.connect()

//consumers can subscribe to multiple topics and receive messages from it
//from beginning means that the consumer will receive all messages from the beginning of the topic,
//if we set it to false, it will only receive new messages
await consumer.subscribe({topics:['system-events'],fromBeginning:true})


await consumer.run(
    {
        eachMessage: async({topic, partition,message})=>{
            console.log(`Received message: ${message.value.toString()} from topic: ${topic} partition: ${partition}`)
        }
    }
)