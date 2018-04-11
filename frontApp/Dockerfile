FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN git clone https://github.com/FLEstiam/gotItFront.git app
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
CMD [ "npm", "start" ] 
