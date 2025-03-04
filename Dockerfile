FROM node:22-alpine

WORKDIR /app

COPY . .
COPY .env.example .env

RUN npm install -g pm2@latest
RUN npm install

EXPOSE 3000

CMD ["pm2-runtime", "./dist/index.js"]