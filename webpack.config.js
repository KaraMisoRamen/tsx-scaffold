var path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: "./src/index.tsx",
  output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  devServer: {
    contentBase: __dirname,
    port: 3000,
		hot: true,
		inline: true
  },

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						babelrc: false,
						presets: [
							[
								"@babel/preset-env",
								{ targets: { browsers: "last 2 versions" } } // or whatever your project requires
							],
							"@babel/preset-typescript",
							"@babel/preset-react"
						],
						plugins: [
							["@babel/plugin-proposal-decorators", { legacy: true }],
							"react-hot-loader/babel"
						]
					}
				}
			},

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

			{
				test: /\.css/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: false,
							minimize: true,
							sourceMap: true
						},
					},
				],
			},
			{
				test: /\.scss/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: false,
							sourceMap: true,
							importLoaders: 2
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					}
				],
			}
		]
  },

	plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
}
