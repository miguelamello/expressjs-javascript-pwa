const path = require('path');

//
 // The WebPack build is so bare bones it doesn't even attempt to provide
 // polyfills for node_modules like browserify would. Given that our
 // testing environment is now running in a browser instead of Node.js we
 // should do a best effort in allowsing these modules to load.
 //
 const browserPolyfill = Object.entries(require('node-libs-browser')).reduce((alias, [key, value]) => {
   alias[key] = value || require.resolve('./test/empty.js');

   return alias;
 }, {});

module.exports = {
  devtool: false,
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    mainFields: ['browser', 'module', 'main'],
    alias: browserPolyfill
  },
  devServer: {
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
