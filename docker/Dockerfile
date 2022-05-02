from node:alpine
COPY . /app
WORKDIR /app
RUN set -xeu; \
    apk add --no-cache python3 build-base; \
    yarn install; \
    yarn build;


from nginx:1.19-alpine
COPY --from=0 /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

