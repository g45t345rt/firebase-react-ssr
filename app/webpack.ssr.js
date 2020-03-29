const path = require("path")
const mode = process.env.NODE_ENV || 'development'

module.exports = {
    target: 'node',
    mode,
    entry: "./ssr.js",
    output: {
        path: path.resolve(__dirname, "../functions"),
        filename: "app-ssr.js",
        libraryTarget: "commonjs2"
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