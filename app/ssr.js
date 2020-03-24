import React, { createElement } from 'react'
import { StaticRouter } from 'react-router-dom'
import { StyleSheetManager, ServerStyleSheet } from 'styled-components'
import ssrPrepass from 'react-ssr-prepass'
import { renderToStaticMarkup } from 'react-dom/server'

import App from './src/app'

export const sheet = new ServerStyleSheet()
export const context = {}

class ServerApp extends React.Component {
    render () {
        const { url } = this.props
        return (
            <StyleSheetManager sheet={sheet.instance}>
                <StaticRouter location={url} context={context}>
                    <App context={context} />
                </StaticRouter>
            </StyleSheetManager>
        )
    }
}

export const renderApp = async (url) => {
    const element = createElement(ServerApp, { url })
    console.log('Fetching data for SSR')
    await ssrPrepass(element, (element, instance) => {
        if (instance && instance.fetch) {
            return instance.fetch()
        }
    })
    console.log('Done fetching data for SSR')
    return renderToStaticMarkup(element)
}