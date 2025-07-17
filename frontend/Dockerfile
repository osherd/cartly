# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage: use nginx to serve static files
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder (try dist, fallback to build)
COPY --from=builder /app/dist /usr/share/nginx/html
# COPY --from=builder /app/build /usr/share/nginx/html # Uncomment if your build output is 'build' instead of 'dist'

# Optionally copy a custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]