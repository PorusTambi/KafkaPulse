// we maintain KafkaState in memory for now
const KafkaState2 = {
    partitions: { 0: [], 1: [] },

    consumers: {
      "Consumer A": { partition: "?", messages: [] },
      "Consumer B": { partition: "?", messages: [] }
    },

    eventCounter: 0, // Counter to generate unique event names
    //This also tells the UI which message to highlight yellow
  }
  
 export default KafkaState2