// we maintain KafkaState in memory for now
const KafkaState = {
    //3 partitions at start, so we have 3 indexes
    partitions: { 0: [], 1: [], 2: [] },

    //3 consumers at start, so we have 3 indexes
    //in one consumer group, each consumer will be assigned to one partition
    consumers: {
      "Consumer A": { partition: "?", messages: [] },
      "Consumer B": { partition: "?", messages: [] },
      "Consumer C": { partition: "?", messages: [] }
    },
    latestTask: null, // This tells the UI which message to highlight yellow

    taskCounter: 0, // Counter to generate unique task names
  }
  
 export default KafkaState 