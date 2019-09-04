const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("@babel/polyfill");


const HtmlWebpackPlugin = require('html-webpack-plugin');



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
		new webpack.ProgressPlugin(), 
		new HtmlWebpackPlugin({
		filename: `index.html`,
		template: './src/index.html'
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
				  'file-loader',
				  {
					loader: 'image-webpack-loader',
					options: {
					  bypassOnDebug: true, // webpack@1.x
					  disable: true, // webpack@2.x and newer
					},
				  },
				],
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
		open: true
	},
};
