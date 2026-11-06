FROM node:24-alpine
WORKDIR /app
COPY server.cjs backup.cjs ./
RUN mkdir -p /data && chown node:node /data
USER node
ENV COLLECTION_DB=/data/collections.sqlite
EXPOSE 8080
CMD ["node", "server.cjs"]
