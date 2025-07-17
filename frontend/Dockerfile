# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage: serve static files with 'serve'
FROM node:18-alpine

WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Start the static server
CMD ["serve", "-s", "dist", "-l", "3000"]