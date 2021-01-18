const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const definePluginConfig = new webpack.DefinePlugin({
	'process.env.NODE_ENV': JSON.stringify('production')
});
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
	const dev = env.NODE_ENV !== 'production';
	return {

		entry: './index.tsx',

		context : path.resolve(__dirname, 'src'),

		output: {
			filename: '[name].[contenthash].bundle.js',
			path: path.resolve(__dirname, 'build'),
		},

		mode: 'production',

		resolve: {
			extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
		},

		plugins: [
			new HtmlWebpackPlugin({ 
				title: 'Webpack Test',
				template: path.resolve(__dirname, '/src/template.html'),
				filename: 'index.html'

			}),
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin(),
			definePluginConfig
		],

		module: {
        	rules: [

            	{
                	test: /\.[tj]sx?$/,
                	exclude: /node_modules/,
                	use: ['babel-loader'],
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
                	use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            	},

        	],
    	},

		optimization: {
			minimize: true ,
			minimizer: [
				new TerserJSPlugin({
					parallel: true
				}),
				new CssMinimizerPlugin(),
				],
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
};