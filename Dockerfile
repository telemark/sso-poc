# Setting the base to nodejs 10.0.0
FROM node:10.7.0-alpine@sha256:9787e45382cb61f65068dbb1ef58337888f55f51f4dfc9455643a1db44da71a4

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