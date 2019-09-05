const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("@babel/polyfill");




module.exports = {
	mode: 'development',
	entry: {
        polyfill: 'babel-polyfill',
        app: './src/index.js'
    },
	
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new CleanWebpackPlugin(),
		new webpack.ProgressPlugin(), 
		new HtmlWebpackPlugin({
		filename: `index.html`,
		template: './src/index.html'
			}),
		new HtmlWebpackPlugin({
				filename: `new-items.html`,
				template: './src/new-items.html'
			}),		
		new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: "[name].css",
				chunkFilename: "[id].css"
			})
		],

	module: {
		rules: [
			{
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
			{
				test: /\.scss$/,
				use: [
					// fallback to style-loader in development
					 MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
				  {
					loader: 'file-loader',
					options: {
					  name: '[name].[ext]',
					  outputPath: 'img',
					 // bypassOnDebug: true, // webpack@1.x
					 // disable: true, // webpack@2.x and newer
					},
				  },
				],
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: ['img:src'],
						minimize: true,
						root: path.resolve(__dirname, 'dist')
					}
				}
			}
		]
	},

/* 	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},
 */
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
		open: true,
		watchContentBase: true
	},
};
