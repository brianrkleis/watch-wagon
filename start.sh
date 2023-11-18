#!/bin/bash

cd watch-wagon-backend
npm install
cd ..
docker compose build 
docker compose up -d
sleep 5
docker exec api knex migrate:up