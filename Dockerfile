# Setting the base to nodejs 10.0.0
FROM node:10.1.0-alpine@sha256:3b0e27010a4b643cc67154381f0f8df74d9aa0d048222f0442428faefa248372

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