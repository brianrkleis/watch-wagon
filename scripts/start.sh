#!/bin/bash

sudo docker compose down
cd watch-wagon-backend
npm install
cd ..
cd watch-wagon-main
npm install
cd ..
sudo docker compose build .
sudo docker compose up -d

sleep 5
sudo docker exec api knex migrate:latest