const path = require("path");

module.exports = {
    target: 'node',
    mode: "development",
    entry: "./ssr.js",
    output: {
        path: path.resolve(__dirname, "../functions"),
        filename: "app-ssr.js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}