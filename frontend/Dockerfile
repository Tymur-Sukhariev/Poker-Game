# frontend/Dockerfile

FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev"]
