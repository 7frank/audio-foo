FROM node:18

WORKDIR /app

# Install jq
RUN apt-get update && apt-get install -y jq

# Install PNPM
RUN npm install -g pnpm http-server

EXPOSE 80

# Set the default command to run "pnpm dev"
CMD ["sh", "-c", "PORT=80 pnpm turbo dev --scope=$(jq -r '.name' package.json)"] 
