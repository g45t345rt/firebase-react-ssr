const path = require("path");

module.exports = {
    target: "web",
    mode: "development",
    entry: "./client.js",
    output: {
        path: path.resolve(__dirname, "../public"),
        filename: "client.bundle.js"
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