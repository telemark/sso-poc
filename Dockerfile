# Setting the base to nodejs 10.0.0
FROM node:10.14.0-alpine@sha256:b3e157beaf4f780f6e6ed058a438989afb0e5174b812c089e731b9f75b4db416

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