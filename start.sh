#!/bin/bash

npm install
docker compose build 
docker compose up -d
sleep 5
docker exec api knex migrate:up