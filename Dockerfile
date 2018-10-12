# Setting the base to nodejs 10.0.0
FROM node:10.12.0-alpine@sha256:1e3e3e7ffc965511c5d4f4e90ec5d9cabee95b5b1fbcd49eb6a2289f425cf183

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