# Installs Node.js image
FROM node:16

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
# COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
COPY package*.json ./

# Copies everything in the src directory to WORKDIR/src
#COPY ./src ./src

COPY . /usr/src/app

# Installs all packages

RUN npm install

CMD npm run start