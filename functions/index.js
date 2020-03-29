const functions = require('firebase-functions')
const Fastify = require('fastify')
const http = require('http')

const template = require('./template')
const ssr = require('./app-ssr')

let handleRequest = null
const serverFactory = (handler, opts) => {
    handleRequest = handler
    return http.createServer()
}

const fastify = Fastify({ serverFactory, modifyCoreObjects: false }) // we need modifyCoreObjects: false -> https://github.com/fastify/fastify/issues/946

fastify.get('*', async (request, reply) => {
    const body = await ssr.renderApp(request.req.url)
    const styles = ssr.sheet.getStyleTags()
    const html = template({
        body,
        styles,
        treeData: JSON.stringify(ssr.context.tree)
    })

    reply.status(ssr.context.status || 200).type('text/html').send(html)
})

exports.app = functions.https.onRequest((req, res) => {
    fastify.ready((err) => {
        if (err) throw err
        handleRequest(req, res)
    })
})