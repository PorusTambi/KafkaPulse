import kafkaClient from "./kafkaClient.js"


const producer = kafkaClient.producer()


//Topics are just logical grouping of data
//Within topics you can do sub grouping using partitions

//commands to create a topic 
//docker exec -it <container name> sh
//./opt/kafka/bin/kafka-topics.sh --create --topic system-events --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1


//each message has a key and value
//key tells which partition to send the message to
//if we give no key for now, Kafka will use some default algo to divide messages evenly across partitions


function _generateMessages(){
    let messages=[]

    for(let i=0; i<10; i++){    
    messages.push({
        value:`User${i} logged in at ${new Date().toISOString()}`
    })
    }
   
    return messages
}


await producer.connect()

//sending messages
await producer.send({
   topic:"system-events",
   messages:_generateMessages()
})

console.log("Messages sent successfully")

await producer.disconnect()