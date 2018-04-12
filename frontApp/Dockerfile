FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN git clone https://github.com/FLEstiam/gotItFront.git app
RUN npm install
EXPOSE 8080
CMD [ "npm", "start" ] 
