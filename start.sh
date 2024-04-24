#!/bin/bash

# Run the following commands in order

# Run migrations to database
pnpm prisma:deploy-prod

# Generate prisma client
pnpm prisma generate

# Seed data to database
pnpm prisma:seed

# Start server
node dist/index.js