const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
        }),
        new MiniCssExtractPlugin(
            { filename: "styles.css"
        }),
        new CleanWebpackPlugin(),
    ],
}