[![Build Status](https://travis-ci.org/telemark/sso-poc.svg?branch=master)](https://travis-ci.org/telemark/sso-poc)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

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
