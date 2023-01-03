# Dockerfile

# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p link-preview
WORKDIR /link-preview

# copy source files
COPY . /link-preview

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3001
CMD npm run dev
