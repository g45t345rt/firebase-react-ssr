import React from 'react'
import styled from 'styled-components'
import { Route, Switch, Link } from 'react-router-dom'

import AppContext from './AppContext'
import NotFound from './NotFound'

export const TestItem = styled.div`
    border: thin solid black;
    border-radius: 5px;
    padding: 5px;
    display: inline-block;
`

class TestComponent extends React.Component {
    static contextType = AppContext
    fetchSSR = true

    constructor (props) {
        super(props)

        this.fetch = this.fetch.bind(this)
    }

    fetch () {
        const { tree } = this.context
        return new Promise((resolve) => {
            setTimeout(() => {
                tree.set('data', 'test')
                resolve()
            }, 2000)
        })
    }

    render () {
        const { tree } = this.context
        return <div>Tree data: <span>{tree.get('data')}</span></div>
    }
}

export default class App extends React.Component {
    render () {
        const { context } = this.props
        return <AppContext.Provider value={context}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/hrtyh456">404</Link></li>
            </ul>
            <Switch>
                <Route path="/" exact strict render={() => {
                    return <div>
                        <h1>Hello world</h1>
                        <h2>Styled component</h2>
                        <TestItem>Test styled component</TestItem>
                        <h2>Baobab state & prepass ssr</h2>
                        <TestComponent />
                    </div>
                }} />
                <Route component={NotFound} />
            </Switch>
        </AppContext.Provider>
    }
}
