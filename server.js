const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.prod.js');

const app = express();
const compiler = webpack(config);

const port = 4000;

// Tell express to use the webpack-dev-middleware and use the webpack.prod.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));


// Serve the files.
app.listen(port, () => console.log(`Example app listening on port ${port}!\nGo to http://localhost:${port}\n`
));

// // TODO: http2

// const fs = require('fs')
// const options = {
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// };
//
// // // Create a secure HTTP/2 server
// const http2 = require('http2');
// const secureServer = http2.createSecureServer(options);
//
// // console connection error
// secureServer.on('error', (err) => console.error(err));
//
// secureServer.on('stream', (stream) => {
//
//   // stream is a Duplex
//   stream.respond({
//     'content-type': 'text/html',
//     ':status': 200
//   });
//
//   // not working
//   // stream.respondWithFile('/index.html')
//
//   stream.end('<h1>Hello World</h1><p>http2 todo</p>');
//
// });
//
// secureServer.listen(3000, () => {
//   console.log(`Example app listening on port ${port}!\nGo to http://localhost:${port}\n`)
// })
