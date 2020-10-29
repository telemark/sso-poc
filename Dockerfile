# Setting the base to nodejs 10.0.0
FROM node:10.23.0-alpine@sha256:0d798a992de3fe3e080f49a8b862ce815cd99c110e707c24e711f8e2ea4b389e

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