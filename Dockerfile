# Use an official node runtime as a parent image - Build stage
FROM node:16-alpine as build-image

WORKDIR /app/

# Copy all source and config files
COPY . /app/

# Install dependencies and avoid `node-gyp rebuild` errors
RUN \
    apk add --no-cache --virtual .gyp build-base python3 && \
    yarn install && \
    yarn build && \
    apk del .gyp && \
    yarn cache clean --all

# Use an official node runtime as a parent image - Runtime
FROM node:16-alpine as runtime

WORKDIR /app/

# Copy node_modules from build stage to have access to scripts
COPY --from=build-image /app/node_modules /app/node_modules

# Copy prebuilt assets
COPY --from=build-image /app/dist/ /app/dist/

# Copy runtime files
COPY --from=build-image /app/package.json /app/

# Copy prebuilt assets
COPY --from=build-image /app/vite.config.ts /app/vite.config.ts

EXPOSE 3000

CMD ["yarn", "preview", "--host", "--port", "3000"]
