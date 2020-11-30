FROM node:12

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD [ "node", "monitorBack.js" ]

