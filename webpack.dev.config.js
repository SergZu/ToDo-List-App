const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

		entry: './index.tsx',

		context : path.resolve(__dirname, 'src'),

		output: {
			filename: '[name].bundle.js' ,
			path: path.resolve(__dirname, 'build'),
		},

		mode: 'development' ,

		resolve: {
			extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
		},

		devtool: 'source-map' ,

		devServer: {
			contentBase: path.resolve(__dirname, 'build'),
			compress: true,
			port: 3000,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			watchContentBase: true,
			historyApiFallback: true,
			open: true,
			hot: true,
		} ,

		plugins: [
			new HtmlWebpackPlugin({ 
				title: 'Webpack Test',
				template: path.resolve(__dirname, './src/template.html'),
				filename: 'index.html'

			}),
			new webpack.HotModuleReplacementPlugin(),
			new CleanWebpackPlugin(),
		],

		module: {
        	rules: [

            	{
                	test: /\.([tj]sx|ts)$/,
                	exclude: /node_modules/,
                	use: ['babel-loader'],
            	},

            	{
            		test: /\.js$/,
            		exclude: /node_modules/,
   					use: ["source-map-loader"],
    				enforce: "pre"
            	},

            	{
                	test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                	exclude: /node_modules/,
                	type: 'asset/resource',
            	},

            	{
                	test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                	exclude: /node_modules/,
                	type: 'asset/inline',
            	},

            	{
                	test: /\.(scss|css)$/,
                	exclude: /node_modules/,
                	use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], 
            	},

        	],
    	},

		optimization: {
			moduleIds: 'deterministic',
			runtimeChunk: 'single',
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			},
		},
	};
