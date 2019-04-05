# Setup

run: npm install

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

- Fetches markdown content from another repository
- Lazy loading images
- Compiles scss to css
- Css autoprefixer
- Minifies css
- Uglifies JavaScript
- Minifies HTML
- Registers a Workbox Service Worker
- A handy static folder
- Manifest and icons
- Uses the latest JavaScript syntax
- And an experimental [dynamic import syntax](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import) to create small chunks. This improves the performance.
- Testing with Jest

## Todo

- Prompt to Install the Web App
