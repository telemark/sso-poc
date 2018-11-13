# Setting the base to nodejs 10.0.0
FROM node:10.13.0-alpine@sha256:5ba2248f02abf173f0fb2bd6f84fca7f3616496c50c9333cdd362314ec2970d9

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