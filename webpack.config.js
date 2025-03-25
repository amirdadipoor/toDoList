const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path')

module.exports = {
    entry : {
        bundle: "./src/index.js",
    },
    mode: "production",
    cache: false,
    output : {
        path : path.resolve(__dirname,'dist'),
        filename: "[name].[contenthash].js",
    },
    stats: 'normal',
    devServer : {
        static: path.resolve(__dirname, "dist"), // Serve files from "dist"
        port: 8989, // Choose any port
        open: true, // Automatically open the browser
        compress: true, // Enable gzip compression
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "ToDo App",
            template: "./src/index.html",
            filename: "index.html",
            minify : false,
        }),
        new MiniCssExtractPlugin({
            filename:  '[name].[contenthash].css'
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
}