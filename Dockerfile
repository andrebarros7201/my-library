FROM node:20-slim

WORKDIR /app

# Install OpenSSL
RUN apt-get update && \
    apt-get install -y openssl

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]