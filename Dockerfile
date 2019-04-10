# Setting the base to nodejs 10.0.0
FROM node:10.15.3-alpine@sha256:217ffdf869f094c8ba5bbd505ab51e13d6a7616ad999a5b740a3bb5f0490f2f3

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