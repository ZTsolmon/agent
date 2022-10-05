# syntax=docker/dockerfile:1
FROM node:lts-buster
RUN apt-get update

# Install service
COPY . /appl
WORKDIR /app/client/
RUN npm install 
WORKDIR /app/
RUN npm instal
EXPOSE 3000
CMD ["sh", "run.sh"]
