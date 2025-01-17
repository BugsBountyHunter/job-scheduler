FROM node:18.17-alpine3.17
RUN apk add --no-cache bash
WORKDIR /job-scheduler
COPY ./package.json /job-scheduler
RUN npm install -g npm@9.5.0
RUN npm install --legacy-peer-deps
RUN npm install -g dotenv-cli
COPY . .
RUN npm run build
RUN npm cache clean --force
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]