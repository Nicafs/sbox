FROM nginx:1.17.6-alpine

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

RUN rm -v /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

COPY build /usr/share/nginx/html
EXPOSE 80

CMD /wait && /usr/sbin/nginx
