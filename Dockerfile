FROM node:lts-slim 
EXPOSE 3000

RUN apt-get update && apt-get install curl -y

WORKDIR /app
COPY . . 
COPY --chmod=0755 entrypoint.sh /entrypoint.sh
RUN npm ci 
RUN npm run build

ENTRYPOINT ["/entrypoint.sh"]
