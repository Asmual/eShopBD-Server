# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app

ENV NODE_ENV="production"

# Install OpenSSL (required for Prisma engines on Linux) and build tools
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Build stage
FROM base AS build

# Install dependencies
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy Prisma schema and migrations, generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy application code and build TypeScript
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Remove devDependencies to keep image light
RUN npm prune --omit=dev

# Final runtime image
FROM base

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma

EXPOSE 5000
ENV PORT=5000

CMD [ "node", "dist/index.js" ]
