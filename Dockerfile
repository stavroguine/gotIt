FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
<<<<<<< HEAD
CMD [ "npm", "start" ] 
=======
CMD [ "npm", "start" ]
>>>>>>> 47868d3e9754b0d3775e79dcd519402c64611e93
