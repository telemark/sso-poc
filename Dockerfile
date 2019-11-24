# Setting the base to nodejs 10.0.0
FROM node:10.16.2-alpine@sha256:fbd467ee008ac7fae1a13340bf4c6110fb3310ad7b09175e159edaea6dd35046

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