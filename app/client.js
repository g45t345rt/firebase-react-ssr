import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Baobab from 'baobab'

import App from './src/App'

const tree = new Baobab()
tree.set(window.__treeData)
delete window.__treeData

ReactDOM.hydrate((<BrowserRouter>
    <App context={{ tree }} />
</BrowserRouter>), document.getElementById('root'));
