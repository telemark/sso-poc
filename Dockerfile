# Setting the base to nodejs 10.0.0
FROM node:10.10.0-alpine@sha256:260b6f423242b7ac5e9b476ef25f26d72d1b55353a5c9be039c91398388cdd50

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV SERVER_PORT 8000

# Expose 3000
EXPOSE 8000

# Startup
ENTRYPOINT node standalone.js