# Simple webpack setup

setup: npm install

```
dev:    npm run start
server: npm run server
build:  npm run build
```

## Certificates

If you want to use my Express server you can generate a certificate.

```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

## Features

- Compiles scss to css
- A css autoprefixer
- Minifies css
- Uglifies JavaScript
- Registers a Service Worker
- A handy static folder
- Manifest and icons
- Uses the latest JavaScript syntax
- And an experimental [dynamic import syntax](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)


## Todo

- Prompt to Install the Web App
