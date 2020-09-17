FROM node:14

ENV TZ="Asia/Shanghai"

RUN npm install cnpm -g --registry=https://registry.npm.taobao.org

WORKDIR /usr/src/app

COPY package*.json ./

RUN cnpm install

COPY . .

EXPOSE 8080
CMD cnpm run serve
