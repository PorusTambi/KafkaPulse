# ⚡ Kafka Pulse
**Interactive Learning Project**

Explore how Apache Kafka behaves in real-time through interactive visual modules. This project demonstrates core Kafka concepts—from basic partitioning to fault tolerance—using an engaging, hands-on web interface.

---

## 🚀 Getting Started

Follow these steps to spin up the entire environment automatically. The startup script handles everything behind the scenes, including starting Docker, downloading the Kafka image, and cleaning up images on subsequent runs.

### Prerequisites
* **Docker** installed and running on your machine.
* **Node.js & npm** installed.

### Installation & Execution

```bash
# 1. Clone the repository to your local machine
git clone <your-repository-url>

# 2. Move into the root directory of the cloned project
cd KafkaPulse

# 3. Grant execute permissions to the startup bash script
chmod +x ./start.sh

# 4. Launch the application in development mode
# This handles everything: Docker start, Kafka image download/cleanup, and starting the server
npm run dev
```

**Step 5: Access the Application**
Wait for your terminal to display the log: `Application is ready to use`. 
Then, open your web browser and navigate to **[http://localhost:3000](http://localhost:3000)** to experience it yourself!

---

## 🧠 Interactive Feature Modules

Once the application is running, the home page will act as your index to explore the following real-time Kafka concepts:

| Phase | Feature Module | Description | Path |
| :---: | :--- | :--- | :--- |
| **1** | **The Basics: Default No-Key Partitioning** | Understand how Kafka automatically distributes unkeyed messages across partitions using the Sticky Partitioner to balance load. | `/default-partitioning` |
| **2** | **Key-Based Ordered Partitioning** | Discover how key-based ordered partitioning happens in Kafka, demonstrated via live cricket match data. | `/keyed-ordered-partitioning` |
| **3** | **Consumer Groups** | Dive into the mechanics of Consumer Groups and understand exactly what they are and how they divide workloads. | `/consumer-groups` |
| **4** | **Fault Tolerance: Rebalancing** | Observe Kafka's resilience in action as it dynamically rebalances message distribution when one out of two active consumers goes offline. | `/rebalancing` |
| **5** | **Fault Tolerance: Resuming Messages** | See how Kafka intelligently resumes messages when a previously downed consumer comes back online. | `/resuming-messages` |
| **6** | **Kafka Vs. Conventional DB** | Understand the difference between Kafka's event streaming and a conventional database. | `/kafka-vs-db` |

---
*Built with Node.js, Docker, and Apache Kafka.*