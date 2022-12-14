# base image
FROM node:16

# create & set working directory
RUN mkdir -p /usr/src/nextjs
WORKDIR /usr/src/nextjs

# copy source files
COPY . /usr/src/nextjs

# install dependencies
RUN npm install

# start app
EXPOSE 3000
CMD npm run dev