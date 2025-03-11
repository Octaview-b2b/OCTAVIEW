# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build TypeScript files
RUN npm run build

# Remove devDependencies to keep the image lightweight
RUN npm prune --omit=dev

# Expose the correct port
EXPOSE 5000

# Start the application
CMD ["node", "dist/app.js"]
