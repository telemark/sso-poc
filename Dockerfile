# Setting the base to nodejs 10.0.0
FROM node:10.7.0-alpine@sha256:e8e64ea9b3a603fa3bf36e5bf459a9392473eeb48240f14d45016d02ebd6c2b0

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