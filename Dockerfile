FROM mhart/alpine-node:6.9.1

EXPOSE 8080

ENV NODE_ENV production

WORKDIR /annon.web
RUN npm install -g pm2

COPY . ./

RUN npm install --production
RUN npm run build

RUN rm -rf ./app/client \
	rm -rf ./app/common \
	rm -rf ./node_modules/webpack

CMD pm2 start --no-daemon static/server.js
