FROM node:12.18.3-alpine

# Switch to non-root user
RUN adduser -D twilens
USER twilens
WORKDIR /home/twilens

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz && \
    tar -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz && \
    rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY --chown=twilens:twilens . .

RUN yarn install --frozen-lockfile && \
    yarn run build && \
    yarn install --frozen-lockfile --production && \
    yarn cache clean

ENV HOST 0.0.0.0
ENTRYPOINT yarn workspace @twilens/web start
