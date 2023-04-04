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

EXPOSE 80
CMD ["npm", "start"]