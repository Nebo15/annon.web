const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server'); //eslint-disable-line
const config = require('./webpack.config');

const port = 3030;

new WebpackDevServer(webpack(config[0]), {
  publicPath: config[0].output.publicPath,
  hot: true,
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
  },
}).listen(port, 'localhost', (err) => {
  /* eslint-disable no-console */
  if (err) {
    console.log(err);
  }

  console.log(`Webpack dev server is listening at localhost: ${port}`);
});
