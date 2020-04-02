const functions = require('firebase-functions')
const Fastify = require('fastify')
const http = require('http')

const template = require('./template')
const { renderApp } = require('./app-ssr')

let handleRequest = null
const serverFactory = (handler, opts) => {
    handleRequest = handler
    return http.createServer()
}

const fastify = Fastify({ serverFactory, logger: true, modifyCoreObjects: false }) // we need modifyCoreObjects: false -> https://github.com/fastify/fastify/issues/946

fastify.get('*', async (request, reply) => {
    const { body, context } = await renderApp(request.req.url)
    const { sheet, helmet, tree, status } = context
    const styles = sheet.getStyleTags()

    const html = template({
        helmet,
        body,
        styles,
        treeData: JSON.stringify(tree)
    })
    reply.status(status || 200).type('text/html').send(html)
})

exports.app = functions.https.onRequest((req, res) => {
    fastify.ready((err) => {
        if (err) throw err
        handleRequest(req, res)
    })
})