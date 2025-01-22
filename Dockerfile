FROM oven/bun:latest

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN bun i
RUN bun install
RUN bun install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the application
RUN bun run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start", "--", "-H", "0.0.0.0"]