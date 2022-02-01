#!/usr/bin/env bash

screen

kill -9 $(lsof -t -i:8080)

kill -9 $(lsof -t -i:8092)

echo "Killed process running on port 8080 && 8092"

sudo yum -y install java-1.8.0-openjdk

java -jar backend-0.0.1-SNAPSHOT.jar
echo "Started server using java -jar command"