# Setting the base to nodejs 10.0.0
FROM node:10.9.0-alpine@sha256:a4212307484e6b662806a538ec6352182aaf8b4b748644aaa7f6e87bda159097

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