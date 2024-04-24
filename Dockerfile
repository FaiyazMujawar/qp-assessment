# Build Stage

FROM node:lts-slim as build

WORKDIR /usr/src/app

COPY package.json .

COPY pnpm-lock.yaml .

# Install pnpm
RUN npm install -g pnpm

RUN pnpm install

COPY . .

CMD [ "pnpm", "build" ]

# Production Stage

FROM node:lts-slim as production

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /usr/src/app

COPY package.json .

COPY pnpm-lock.yaml .

# Install pnpm
RUN npm install -g pnpm

# Install only production dependencies packages
RUN pnpm install --prod

# Copy only build files (js) from build stage, not the ts files
COPY --from=build /usr/src/app/dist ./dist

# Copy prisma-related files
COPY --from=build /usr/src/app/prisma ./prisma

# Copy .env.prod
COPY --from=build /usr/src/app/.env.prod .

# Copy start.sg
COPY --from=build /usr/src/app/start.sh .

# Copy DATABASE_URL from args to env
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Expose port 3000 from container
EXPOSE 3000

RUN chmod +x start.sh

ENTRYPOINT [ "./start.sh" ]