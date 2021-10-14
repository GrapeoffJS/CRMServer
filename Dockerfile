FROM node:14.18.1

ENV NODE_ENV=production
ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm i -g pm2

COPY ./ /CRMServer
WORKDIR /CRMServer

RUN yarn
RUN yarn add ts-loader -D
RUN yarn add @types/express -D
RUN yarn add @types/node -D
RUN yarn build
RUN rm -rf ./src

EXPOSE 4200

CMD [ "pm2-runtime", "ecosystem.config.js"]