FROM alpine:3.7
RUN apk add --update nginx python nodejs git && rm -rf /var/cache/apk/*
RUN mkdir -p /tmp/nginx/client-body
RUN mkdir -p /usr/share/nginx/html
RUN nginx -v

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN git clone https://github.com/FLEstiam/gotItFront.git .

COPY docker_build/config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker_build/config/nginx/default.conf /etc/nginx/conf.d/default.conf
RUN npm install && npm run build
RUN ls
RUN cp -R /usr/src/app/dist/* /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html



CMD ["nginx", "-g", "daemon off;"]
