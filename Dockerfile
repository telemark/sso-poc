# Setting the base to nodejs 10.0.0
FROM node:10.15.1-alpine@sha256:0cbb2f7bbc8e7c3a519fa05263cea700324f627369bd44c0a42f8da275179e19

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