# stage 1 build
From node:alpine3.10 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# stage 2 

From node:alpine3.10 

WORKDIR /usr/src/app

RUN mkdir -p /var/log/KoinX-logs

COPY --from=build /usr/src/app .

User node

EXPOSE 5000

CMD["node","index.js"]

