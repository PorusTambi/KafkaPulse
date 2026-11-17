// we maintain KafkaState in memory for now
const KafkaState5 = {
  partitions: { 0: [], 1: [] },

  consumers: {
    "Consumer A": { partition: "?", messages: [] },
    "Consumer B": { partition: "?", messages: [] }
  },
  latestTask: null, // This tells the UI which message to highlight yellow

  taskCounter: 0, // Counter to generate unique task names
}

export default KafkaState5