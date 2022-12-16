#!/usr/bin/env bash

echo "Starting server"
npm run start & 

echo "Make requests"
# make requests 
./make-requests.sh
