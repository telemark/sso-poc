# Setting the base to nodejs 10.0.0
FROM node:10.15.3-alpine@sha256:5f9cd51eaeeb2eaec4a9bcf92d18d8908f1d489534cabff04b5f4eafae877cee

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