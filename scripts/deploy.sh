#!/bin/bash

REMOTE_PATH="$1"
SSH_CONFIG_FILE="${REMOTE_PATH}/ssh-config"
DOCKER_COMPOSE_FILE=="${REMOTE_PATH}/docker-compose.yml"
REMOTE_REPO_URL="git@github.com:brianrkleis/watch-wagon.git"
echo $REMOTE_PATH

# Cópia do docker-compose.yml e ssh-config para o servidor remoto
scp -o StrictHostKeyChecking=no -i $EC2_SSH_KEY $DOCKER_COMPOSE_FILE ec2-user@${EC2_HOST}:${REMOTE_PATH}
scp -o StrictHostKeyChecking=no -i $EC2_SSH_KEY $SSH_CONFIG_FILE ec2-user@${EC2_HOST}:~/.ssh/config

# SSH no servidor remoto e executa o docker-compose up
ssh -i $EC2_SSH_KEY ec2-user@${EC2_HOST} "cd ${REMOTE_PATH} && git clone ${REMOTE_REPO_URL} && cd watch-wagon && chmod +x /script/start.sh && bash /script/deploy.sh"