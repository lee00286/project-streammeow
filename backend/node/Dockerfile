# Dockerfile adapted from
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5001

# Migrate database and load seed
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

CMD [ "node", "app.js" ]