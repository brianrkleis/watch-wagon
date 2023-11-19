#!/bin/bash

# Configuração
DOCKER_COMPOSE_FILE="docker-compose.yml"
SSH_CONFIG_FILE="ssh-config"
REMOTE_PATH="/path/to/remote/directory"

pwd

# # Cópia do docker-compose.yml e ssh-config para o servidor remoto
# scp -o StrictHostKeyChecking=no -i $EC2_SSH_KEY $DOCKER_COMPOSE_FILE ec2-user@${EC2_HOST}:${REMOTE_PATH}
# scp -o StrictHostKeyChecking=no -i $EC2_SSH_KEY $SSH_CONFIG_FILE ec2-user@${EC2_HOST}:~/.ssh/config

# # SSH no servidor remoto e executa o docker-compose up
# ssh -i $EC2_SSH_KEY ec2-user@${EC2_HOST} "cd ${REMOTE_PATH} && docker-compose up -d"