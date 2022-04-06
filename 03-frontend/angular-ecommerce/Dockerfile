#### Stage 1: Build the angular application
FROM node:latest as builder
 
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT 
# commands.
WORKDIR /app

# Configure the main working directory inside the docker image. 
RUN mkdir -p /app

RUN chmod -R 777 /app
 
# Copy the main application
COPY . .

RUN npm install

# Build the application
RUN npm run build --prod

# RUN the final command
#CMD ["npm", "start"]

FROM nginx:alpine
COPY --from=builder app/dist/angular-ecommerce usr/share/nginx/html
COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf/default.conf

EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
