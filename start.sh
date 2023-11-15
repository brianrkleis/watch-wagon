#!/bin/bash

docker compose build -t
docker compose up -d
sleep 10
docker compose run api knex migrate:up 
docker compose run api knex seed:run