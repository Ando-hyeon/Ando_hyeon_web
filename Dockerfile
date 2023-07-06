FROM node:16.14.0

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN yarn

# 로컬에 node_modules있으면 지워주자.
COPY ./ ./

CMD ["yarn", "start"]
