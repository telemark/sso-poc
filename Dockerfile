# Setting the base to nodejs 10.0.0
FROM node:10.14.2-alpine@sha256:8606c1c295992d1a2aa6375dc300684d94929362e6015df296e7364af531cc84

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