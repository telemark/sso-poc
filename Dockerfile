# Setting the base to nodejs 10.0.0
FROM node:10.15.3-alpine@sha256:e622269573edaa6be7676d21ec87f9038cef11464df87d9d67425d6af29ee4f1

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