# Setting the base to nodejs 10.0.0
FROM node:10.15.3-alpine@sha256:aa28f3b6b4087b3f289bebaca8d3fb82b93137ae739aa67df3a04892d521958e

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