# Setting the base to nodejs 10.0.0
FROM node:10.16.0-alpine@sha256:730e6a60c7e3e62d82218f313b4d1c8ffbfc7adff9e11dd66ea8b4e61c269a06

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