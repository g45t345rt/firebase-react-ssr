const path = require("path")
const mode = process.env.NODE_ENV || 'development'

module.exports = {
    target: "web",
    mode,
    entry: "./client.js",
    output: {
        path: path.resolve(__dirname, "../public"),
        filename: "client.bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
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