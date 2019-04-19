FROM node:8-alpine

RUN mkdir /app
WORKDIR /app
ADD package.json /app/
ADD . /app

CMD ["npm", "run", "start"]
