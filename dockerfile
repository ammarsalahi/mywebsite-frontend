# frontend/Dockerfile

# Step 1: Use Node.js image to build the frontend
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code and build the Vite app
COPY . .
RUN npm run build

# Step 2: Use a lightweight Node.js image to serve the built frontend
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 80

# Serve the Vite app
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "80"]
