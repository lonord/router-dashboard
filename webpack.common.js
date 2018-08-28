const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const output = 'dist'

module.exports = {
	entry: {
		vendor: [
			// Required to support async/await
			'@babel/polyfill',
		],
		main: [
			'./src/index.tsx',
		],
	},
	module: {
		rules: [{
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
							{
								targets: {
									browsers: "last 2 versions"
								}
							} // or whatever your project requires
						],
						"@babel/preset-typescript",
						"@babel/preset-react"
					],
					plugins: [
						// plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
						["@babel/plugin-proposal-decorators", {
							legacy: true
						}],
						["@babel/plugin-proposal-class-properties", {
							loose: true
						}]
					]
				}
			}
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: ['file-loader']
		}]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx']
	},
	plugins: [
		new CleanWebpackPlugin([output]),
		new HtmlWebpackPlugin({
			title: 'title',
			filename: 'index.html',
			meta: {
				viewport: 'width=device-width,height=device-height,inital-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
			}
		})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, output)
	}
};