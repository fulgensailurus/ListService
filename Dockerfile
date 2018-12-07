FROM node:11.3.0-stretch

RUN set -xe \
    && apt-get update \
    && apt-get install -y sqlite3

ENV SRC_DIR=/data/src

COPY . ${SRC_DIR}
WORKDIR ${SRC_DIR}
RUN set -xe \
    && npm install
