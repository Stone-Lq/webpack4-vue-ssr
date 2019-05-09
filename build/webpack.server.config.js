/*
 * @Author: 黄 楠
 * @Date: 2019-04-30 14:55:42
 * @Last Modified by: 黄 楠
 * @Last Modified time: 2019-05-09 09:50:40
 * @Description:
 */
const merge = require("webpack-merge");
const webpack = require("webpack");
const base = require("./webpack.base.config");
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

module.exports = merge(base, {
    // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时，
    // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: "node",
    devtool: "#source-map",
    entry: "./src/entry-server.ts",
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
        filename: "server-bundle.js",
        libraryTarget: "commonjs2",
    },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        // whitelist: /\.css$/
    }),
    plugins: [
        new VueSSRServerPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ],
});