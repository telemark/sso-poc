# Setting the base to nodejs 10.0.0
FROM node:10.14.2-alpine@sha256:15d9f1cd2ca1e5b8c812792e60a1ca6609f1d547268e56f9a6c7d11c39a466dd

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