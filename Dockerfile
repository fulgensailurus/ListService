FROM node:10.9-stretch

ENV SRC_DIR=/data/src

COPY . ${SRC_DIR}
WORKDIR ${SRC_DIR}
RUN npm i --quiet
