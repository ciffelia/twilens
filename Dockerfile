FROM node:14-alpine

# Switch to non-root user
RUN adduser -D twilens
USER twilens
WORKDIR /home/twilens

COPY --chown=twilens:twilens . .

RUN yarn install --immutable && \
    yarn run build && \
    yarn cache clean --mirror

ENV HOST 0.0.0.0
ENTRYPOINT ["yarn", "run"]
