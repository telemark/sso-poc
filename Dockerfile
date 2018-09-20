# Setting the base to nodejs 10.0.0
FROM node:10.11.0-alpine@sha256:782a30c4579ed318edada6cfa945e6804cc0835799be785172429e88f11ec39f

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