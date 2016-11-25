FROM mhart/alpine-node:7
# FROM node:latest
MAINTAINER [Rhio Kim <rhio.kim@gmail.com>

RUN apk add --no-cache curl

#copy package first to cache npm-install and speed up build
COPY index.js index.js
COPY package.json package.json

RUN npm --quiet --no-color install
RUN rm -rf /root/.npm && npm uninstall -g npm

ENV PORT 7777

EXPOSE $PORT

CMD ["npm", "start"]
