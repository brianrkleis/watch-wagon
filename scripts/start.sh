#!/bin/bash

sudo docker compose down
sudo docker compose rm --all
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
cd $(pwd)/watch-wagon-backend
nvm use 12
npm install
cd ..
cd $(pwd)/watch-wagon-main
nvm use 16
npm install
cd ..
sudo docker compose build 
sudo docker compose up -d

sleep 5
sudo docker exec api knex migrate:latest
sudo docker exec api knex seed:run