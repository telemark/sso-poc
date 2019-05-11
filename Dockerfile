# Setting the base to nodejs 10.0.0
FROM node:10.15.3-alpine@sha256:1485cb970ffc9926189f8f35ed37a7318fa5c5f3c8971a7b550ecf0b79157137

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