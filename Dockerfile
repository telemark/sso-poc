# Setting the base to nodejs 10.0.0
FROM node:10.15.1-alpine@sha256:f04334c40299fb140c5e69f2b0801d340424a44306740eda6454e06d38fef422

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