FROM node:18
WORKDIR /usr/src/api-professional
COPY ./package.json .
RUN npm install --omit=dev
COPY ./dist ./dist
EXPOSE 8181
CMD npm start