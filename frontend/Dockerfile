# Build the React App
# basically, this compiles the React project to static HTML and js files.
FROM node:14-alpine3.14 as build

# Create app directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# Bundle app source
COPY . ./

RUN npm run build

#######

# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80
# CMD ["sudo", "npm", "start"]

#######

FROM nginx:1.21.6-alpine
# FROM nginx:latest

# COPY --from=build /app/build /usr/share/nginx.html
COPY --from=build /app/build /usr/share/nginx/html
COPY certs /etc/nginx/certs
RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]