FROM alpine:latest

RUN apk --update add gcc make g++ zlib-dev linux-headers pcre-dev openssl-dev wget tar
RUN wget https://nginx.org/download/nginx-1.21.6.tar.gz
RUN tar -xvf nginx-1.21.6.tar.gz

WORKDIR nginx-1.21.6

RUN ./configure --without-poll_module --with-http_ssl_module --without-http_ssi_module --without-http_userid_module \
    --without-http_autoindex_module --without-http_geo_module --without-http_split_clients_module \
    --without-http_fastcgi_module --without-http_uwsgi_module --without-http_scgi_module \
    --without-http_grpc_module --without-http_memcached_module --without-http_empty_gif_module

RUN make && make install

EXPOSE 80
EXPOSE 443

WORKDIR /usr/local/nginx/sbin/

CMD ["./nginx"]