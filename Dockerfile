# Setting the base to nodejs 10.0.0
FROM node:10.15.3-alpine@sha256:28b852ea7680214a9d243ab5a11e1305e0345fbd132f56c34ace68f75f7f950c

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