#!/bin/bash

npm install
docker compose build 
docker compose up -d
sleep 5
docker exec -it api knex migrate:up
