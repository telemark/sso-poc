# Setting the base to nodejs 10.0.0
FROM node:10.16.1-alpine@sha256:ccf88c24f801feaadf43520ad8979daec308ee2cc42331a1b3f1e1ce384a1714

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