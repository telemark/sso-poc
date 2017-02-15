[![Build Status](https://travis-ci.org/telemark/sso-poc.svg?branch=master)](https://travis-ci.org/telemark/sso-poc)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/sso-poc.svg)](https://greenkeeper.io/)

# sso-poc

Proof of concept for sso

## Docker

```sh
$ docker build -t ssopoc .
```

Start

```sh
$ docker run -d -p 80:8000 --name ssopoc ssopoc
```

From hub.docker.com
```sh
$ docker run -d -p 80:8000 --name ssopoc telemark/sso-poc
```

## License

[MIT](LICENSE)

![alt text](https://robots.kebabstudios.party/sso-poc.png "Robohash image of sso-poc")
