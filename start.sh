#!/bin/bash

<<<<<<< HEAD
docker compose build 
docker compose up -d
sleep 5
docker exec -it api knex migrate:up
=======
docker compose build -t
docker compose up -d
sleep 10
docker compose run api knex migrate:up 
docker compose run api knex seed:run
>>>>>>> 6f1fd0080f2679b045244fb30e42f82f8d0cac64
