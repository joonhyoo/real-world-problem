# Build stage
FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:22-slim

WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD ["serve", "-s", "dist"]
