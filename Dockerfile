# Setting the base to nodejs 10.0.0
FROM node:10.15.3-alpine@sha256:101042fddccda3a5ae5fbd6752fa568c663e9dc18cec7f7e7b8300c88480fcbe

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