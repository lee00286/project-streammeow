# Dockerfile adapted from
# https://docs.docker.com/language/golang/build-images/#create-a-dockerfile-for-the-application
FROM golang:1.17-alpine

# Create app directory
# WORKDIR /app
# WORKDIR /
WORKDIR /go/src/app/examples/broadcast

# Install app dependencies
COPY go.mod ./
COPY go.sum ./

RUN go mod download
# RUN GO111MODULE=on go mod download

# Bundle app source
COPY . ./
# COPY *.go ./

# RUN go build
RUN go build -o main .
# RUN go build -o /docker-gs-ping
# RUN go build ./...

EXPOSE 8080
# CMD [ "go", "run", "./examples/broadcast/main.go" ]
# CMD [ "go", "run", "/go/src/app/examples/broadcast/main.go" ]
# CMD [ "go", "run", "./main.go" ]
RUN chmod +x main
CMD ["./main"]