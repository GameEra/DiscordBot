FROM node:latest

# Create the directory!
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and Install our bot
COPY package.json /usr/src/bot
RUN npm install

# Our precious bot
COPY . /usr/src/bot

LABEL maintainer="Surya Manavalan"

# Start me!
CMD ["node", "index.js"]