FROM node:latest

ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm i -g pm2

COPY ./ /CRMServer
WORKDIR /CRMServer

RUN yarn
RUN yarn build
RUN rm -rf ./src

EXPOSE 4200
EXPOSE 4201

CMD [ "pm2-runtime", "ecosystem.config.js"]