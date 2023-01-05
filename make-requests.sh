#!/bin/bash
echo "Starting request loop"

while true; do
  curl --silent http://localhost:3000/blog
  curl --silent http://localhost:3000/posts/1
  curl --silent http://localhost:3000/
  sleep 10
done
