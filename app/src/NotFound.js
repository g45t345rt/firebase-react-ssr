import React from 'react'
import AppContext from './AppContext'

export default class NotFound extends React.Component {
    static contextType = AppContext

    render () {
        this.context.status = 404
        return <div>404 not found (check network status in inspect to see that server sent 404)</div>
    }
}