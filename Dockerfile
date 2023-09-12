FROM node:18

WORKDIR /app

COPY package*.json ./
COPY public/ ./public
COPY src/ ./src

RUN npm install @mui/material @emotion/react @emotion/styled 

RUN npm build

EXPOSE 3000

CMD ["npm", "start"]
