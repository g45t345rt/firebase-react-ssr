import React, { createElement } from 'react'
import { StaticRouter } from 'react-router-dom'
import { StyleSheetManager, ServerStyleSheet } from 'styled-components'
import ssrPrepass from 'react-ssr-prepass'
import { renderToStaticMarkup } from 'react-dom/server'
import Baobab from 'baobab'
import Helmet from 'react-helmet'

import App from './src/App'

class ServerApp extends React.Component {
    render () {
        const { url, context } = this.props
        return (
            <StyleSheetManager sheet={context.sheet.instance}>
                <StaticRouter location={url}>
                    <App context={context} />
                </StaticRouter>
            </StyleSheetManager>
        )
    }
}

const sheet = new ServerStyleSheet()
export const renderApp = async (url) => {
    const context = {
        sheet,
        tree: new Baobab()
    }

    const element = createElement(ServerApp, { url, context })
    console.log('Fetching data for SSR')
    await ssrPrepass(element, (element, instance) => {
        if (instance && instance.fetch) {
            const { location } = instance.props
            if (location && location.pathname === url || instance.fetchSSR) {
                return instance.fetch()
            }
        }
    })
    console.log('Done fetching data for SSR')

    const body = renderToStaticMarkup(element)
    context.helmet = Helmet.renderStatic()
    return { body, context }
}