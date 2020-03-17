const functions = require('firebase-functions')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

const template = require('./template')
const ssr = require('./app-ssr')

exports.app = functions.https.onRequest((req, res) => {
    const context = {}
    let initialState = {}

    const body = ReactDOMServer.renderToString(
        React.createElement(ssr.default, {
            url: req.url,
            context,
            initialState
        })
    )

    res.status(context.status || 200)

    const html = template({
        body,
        initialState: JSON.stringify(initialState)
    })

    res.send(html)
})
