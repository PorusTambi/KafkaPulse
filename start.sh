#!/bin/bash

# Tell Bash to immediately stop the script if an unexpected error happens in critical steps (like docker compose up)
set -e

# Define the name of your Kafka container (must match container_name in docker-compose.yml)
CONTAINER_NAME="KafkaPulse-broker"

echo "----------------------------------------------------"
echo "🔍 Step 1: Checking if ./kafka_data folder exists..."
echo "----------------------------------------------------"
# The '-d' flag checks if "./kafka_data" is an existing directory on your Mac
if [ -d "./kafka_data" ]; then
  echo "🗑️ Found ./kafka_data! Deleting it for a clean state..."
  # Permanently delete the folder and all topic/partition files inside it
  rm -rf ./kafka_data
  echo "✅ ./kafka_data deleted."
else
  # If the folder isn't there, skip deletion without throwing an error
  echo "✅ No ./kafka_data folder found. Skipping deletion."
fi

echo ""
echo "----------------------------------------------------"
echo "🐳 Step 2: Checking if Docker Desktop is running..."
echo "----------------------------------------------------"
# 'docker info' talks to the Docker engine. We hide its output (> /dev/null 2>&1).
# The '!' checks if the command FAILED (meaning the Docker engine is NOT running).
if ! docker info > /dev/null 2>&1; then
  echo "⚡ Docker is not running. Starting Docker Desktop on macOS..."
  # 'open -g -a Docker' opens the Docker.app on your Mac in the background (-g) so it doesn't steal window focus
  open -g -a Docker
  
  # Loop every 2 seconds until 'docker info' succeeds (meaning the Linux VM inside Docker is fully booted)
  echo "⏳ Waiting for the Docker engine to finish booting..."
  until docker info > /dev/null 2>&1; do
    echo "   ...still waiting for Docker engine (2s)..."
    sleep 2
  done
  echo "✅ Docker Desktop is now up and running!"
else
  # If 'docker info' succeeded on the first try, do nothing!
  echo "✅ Docker is already running."
fi

echo ""
echo "----------------------------------------------------"
echo "🧹 Step 3: Cleaning up old containers (docker compose down -v)..."
echo "----------------------------------------------------"
# In Bash, 'command || fallback' catches errors even when 'set -e' is active.
# If 'docker compose down -v' fails (e.g., network doesn't exist or minor cleanup hiccup),
# the '|| { ... }' block catches the error, prints a warning, and allows the script to keep going!
docker compose down -v || {
  echo "⚠️ Warning: 'docker compose down -v' encountered a minor error (nothing was running or already cleaned). Continuing safely..."
}

# Extra safety check: When 'docker compose down -v' stops a running Kafka container, 
# Kafka sometimes flushes one last file into ./kafka_data right before dying. Let's make sure it's gone:
rm -rf ./kafka_data

echo ""
echo "----------------------------------------------------"
echo "🚀 Step 4: Starting fresh containers (docker compose up -d)..."
echo "----------------------------------------------------"
# Start the containers specified in docker-compose.yml in detached (background) mode
docker compose up -d

echo "⏳ Waiting for Kafka broker inside '$CONTAINER_NAME' to be ready for connections..."
# Even after the container starts, Kafka takes ~3-5 seconds to boot the JVM and initialize KRaft.
# We poll the broker every 2 seconds so 'node app.js' doesn't crash on startup with ECONNREFUSED.
until docker exec "$CONTAINER_NAME" /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --list > /dev/null 2>&1; do
  echo "   ...Kafka broker is still initializing, waiting 2 seconds..."
  sleep 2
done
echo "✅ Kafka broker is fully ready!"

echo ""
echo "----------------------------------------------------"
echo "🟢 Step 5: Starting Node application (node app.js)..."
echo "----------------------------------------------------"
# Run your Node.js app in the foreground so you can see all console.logs and press Ctrl+C to stop it
node app.js