ARG NODE_VERSION=alpine
FROM node:$NODE_VERSION

RUN set -xe \
    && apk add --no-cache sqlite su-exec

ENV SRC_DIR=/data/src

ARG UID=1000
ARG GID=1000

RUN set -xe \
    && if [ ! $(id -u node) = ${UID} ]; then \
         apk --no-cache add shadow; \
         groupmod -g ${GID} node; \
         usermod -u ${UID} node; \
         apk --no-cache del shadow; \
       fi

COPY --chown=node:node . ${SRC_DIR}
WORKDIR ${SRC_DIR}

RUN set -xe \
    && su-exec node npm install

ENTRYPOINT [ "su-exec", "node" ]
CMD ["npm", "run", "serve"]
