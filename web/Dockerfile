# syntax=docker/dockerfile:1
FROM node:lts-buster
RUN apt-get update

# Install service
COPY . /app
WORKDIR /app/client/
RUN npm install 
WORKDIR /app/
RUN npm install
EXPOSE 3000
CMD ["sh", "run.sh"]
