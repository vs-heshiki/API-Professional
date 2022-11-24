FROM node:18-alpine
WORKDIR /usr/src/api-professional
COPY ./package.json .
RUN npm install --omit=dev
ARG MONGO_URL ENV MONGO_URL=$MONGO_URL