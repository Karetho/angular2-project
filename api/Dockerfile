FROM node:alpine

WORKDIR /api

COPY package*.json /api/

RUN npm install

COPY ./ /api/

EXPOSE 80

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm start
