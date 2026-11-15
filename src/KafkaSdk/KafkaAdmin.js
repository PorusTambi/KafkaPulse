import KafkaClient from "./KafkaClient.js";

const KafkaAdmin = KafkaClient.admin()

await KafkaAdmin.connect()

console.log('\n Kafka Admin connected successfully! \n')

export default KafkaAdmin