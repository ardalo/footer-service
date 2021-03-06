FROM node:14.17.0 as builder
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install
COPY . /app
RUN npm run build
RUN rm -rf node_modules && npm install --production

FROM node:14.17.0-alpine
RUN addgroup -S ardalo && adduser -S ardalo -G ardalo
USER ardalo:ardalo
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/.env.dist /app/.env.dist

ENTRYPOINT ["npm", "run", "start:prod"]
