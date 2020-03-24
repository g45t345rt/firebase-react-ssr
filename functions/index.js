const functions = require('firebase-functions')

const template = require('./template')
const ssr = require('./app-ssr')

exports.app = functions.https.onRequest(async (req, res) => {
    const body = await ssr.renderApp(req.url)
    res.status(ssr.context.status || 200)

    const styles = ssr.sheet.getStyleTags()
    console.log(styles)
    const html = template({
        body,
        styles,
        treeData: JSON.stringify(ssr.context.tree)
    })

    res.send(html)
})
