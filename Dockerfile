FROM node:20-alpine AS development

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
