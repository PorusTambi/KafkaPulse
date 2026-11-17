// we maintain KafkaState in memory for now
const KafkaState3 = {
    //2 partitions at start, so we have 2 indexes
    partitions: { 0: [], 1:[] },

    //2 consumer groups , and 2 consumers in each group
    consumers: {
      1:{
      "Consumer A": { partition: "?", messages: [] },
      "Consumer B": { partition: "?", messages: [] }
      },
      2:{
        "Consumer C": { partition: "?", messages: [] },
        "Consumer D": { partition: "?", messages: [] },
      }
    },
    latestTask: null, // This tells the UI which message to highlight yellow

    taskCounter: 0, // Counter to generate unique task names
  }
  
 export default KafkaState3