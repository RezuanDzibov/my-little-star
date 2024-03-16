FROM node:21.6.1

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install --verbose

COPY . .