const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin            = require('terser-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const path                    = require("path"); 


module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ],
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ] 
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                    loader: 'url-loader',
                    options: {
                    limit: 8192,
                    }
                },

                //test: /\.(ico|png|jpg|gif)$/,
                //dependency: { not: ['url'] },
                // type: 'asset/resource',
                // use: [
                    // {
                        // loader: 'file-loader',
                        // options: {
                            // esModule: false,
                            //name: 'assets/images/[name].[ext]'
                        // }
                    // }
                // ],
                // type: 'javascript/auto'
            //}
            
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")],
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
    ]

}