FROM node:12-alpine

WORKDIR /app
COPY WorldCities/ClientApp/package.* .
RUN npm i

EXPOSE 4200 49153

CMD ["npm", "run", "start:docker"]
