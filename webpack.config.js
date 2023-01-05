const date = new Date();
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {

	mode: "production", 
	entry: path.resolve(__dirname, "../source/index.js"),

	output: {
		filename: "index.js?v=" + date.getTime(), 
		chunkFilename: '[contenthash].js', 
		path: path.resolve(__dirname, "../dist")
	},

	optimization: {
    minimize: true
	},

	performance: {
    maxAssetSize: 500000 // increase asset size limit to 500KB
  },

	module: {
		rules: [
			{
				test: /\.m?js$/,
				include: path.resolve(__dirname, "../source"), 
				exclude: /(node_modules)/,
				use: {
          loader: "babel-loader",
          options: {
            presets: [[ "@babel/preset-env" ]]
          }
        }
			},
			{
        test: /\.css$/i,
        use: ['style-loader','css-loader', 
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [[ "postcss-preset-env" ]],
              }
            },
          },
        ],
      }
		]
	},	

	devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    compress: true,
    port: 9000,
  },

	plugins: [
		new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(date.getTime())
    }), 
		new HtmlWebpackPlugin({
      template: './index.html',
      version: '<%= process.env.VERSION %>', 
    }), 
		new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!favicons/**', '!images/**'],  // delete all files and directories, except for the 'static' directory
    })
		/*new WorkboxPlugin.GenerateSW({
			// these options encourage the ServiceWorkers to get in there fast
			// and not allow any straggling "old" SWs to hang around
			clientsClaim: true,
			skipWaiting: true,
			swDest: './workbox-service-worker.js'
		})*/
	]
};