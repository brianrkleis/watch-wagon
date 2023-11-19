#!/bin/bash

REMOTE_PATH="$1"
SSH_CONFIG_FILE="${REMOTE_PATH}/ssh-config"
DOCKER_COMPOSE_FILE=="${REMOTE_PATH}/docker-compose.yml"
REMOTE_REPO_URL="git@github.com:brianrkleis/watch-wagon.git"
echo $REMOTE_PATH

# SSH no servidor remoto e executa o docker-compose up
ssh -i $EC2_SSH_KEY ec2-user@${EC2_HOST} "cd ${REMOTE_PATH} && git clone ${REMOTE_REPO_URL} && cd watch-wagon && chmod +x /script/start.sh && bash /script/deploy.sh"