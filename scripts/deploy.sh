#!/bin/bash
# SSH no servidor remoto e executa o docker-compose up
ssh -i $EC2_SSH_KEY ec2-user@${EC2_HOST} "cd ${REMOTE_PATH} && git clone ${REMOTE_REPO_URL} && cd watch-wagon && chmod +x /script/start.sh && bash /script/deploy.sh"