# Setting the base to nodejs 10.0.0
FROM node:10.15.3-alpine@sha256:313c5c88acc0ec12a9abca9a83719065dfd54e94ffc56464b7ce24998dd2838d

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