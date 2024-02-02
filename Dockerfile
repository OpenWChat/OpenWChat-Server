FROM node:16.17.0 as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]