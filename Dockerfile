# Use an official Node.js runtime as a parent image
FROM node:22.4-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install NestJS dependencies
RUN rm -rf /var/cache/apk/*
RUN apk update
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port that your app runs on
EXPOSE 3000

# Define the command to run your app using npm
CMD ["npm", "run", "start:prod"]