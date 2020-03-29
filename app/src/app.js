import React from 'react'
import styled from 'styled-components'
import { Route, Switch, Link } from 'react-router-dom'
import Baobab from 'baobab'

import AppContext, { root } from './AppContext'
const tree = new Baobab()
if (typeof window !== 'undefined') {
    tree.set(window.__treeData)
    delete window.__treeData
}

const TestItem = styled.div`
    border: thin solid black;
    border-radius: 5px;
    padding: 5px;
    display: inline-block;
`

class TestComponent extends React.Component {
    static contextType = AppContext;

    constructor (props) {
        super(props)
    }

    fetch () {
        return new Promise((resolve) => {
            setTimeout(() => {
                tree.set('data', 'test')
                resolve()
            }, 2000)
        })
    }

    render () {
        return <div>Tree data: {this.context.tree.get('data')}</div>
    }
}

class App extends React.Component {
    constructor (props) {
        super(props)

        if (props.context) {
            props.context.tree = tree
        }
    }

    render () {
        return <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/hrtyh456">404</Link></li>
            </ul>
            <Switch>
                <Route path="/" exact render={() => {
                    return <div>
                        <h1>Hello world</h1>
                        <h2>Styled component</h2>
                        <TestItem>Test styled component</TestItem>
                        <h2>Baobab state & prepass ssr</h2>
                        <TestComponent />
                    </div>
                }} />
                <Route render={({ staticContext }) => {
                    if (staticContext) staticContext.status = 404
                    return <div>404</div>
                }} />
            </Switch>
        </div>
    }
}

export default root({ tree }, App)