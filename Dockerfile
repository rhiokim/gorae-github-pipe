FROM mhart/alpine-node:7
# FROM node:latest
MAINTAINER [Rhio Kim <rhio.kim@gmail.com>]

RUN apk add --no-cache git openssh

# copy package first to cache npm-install and speed up build
RUN mkdir -p server root
WORKDIR server

RUN ssh-keygen -t rsa -b 4096 -f /root/.ssh/id_rsa
RUN ssh-keyscan -H github.com,192.30.253.112 >> ~/.ssh/known_hosts
RUN cat /root/.ssh/id_rsa.pub

COPY lib lib
COPY index.js index.js
COPY package.json package.json

RUN npm install --quiet --no-color --prod
RUN npm cache clean
# RUN rm -rf /root/.npm
# RUN npm uninstall -g npm

ENV PORT 7777

EXPOSE $PORT

CMD ["npm", "start"]
