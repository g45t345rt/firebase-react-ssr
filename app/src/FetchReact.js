import React from 'react'

const FetchReactContext = React.createContext()
export const FetchReactProvider = FetchReactContext.Provider

class FetchReact extends React.Component {
    static contextType = FetchReactContext

    static defaultProps = {
        ssr: true
    }

    constructor(props, context) {
        super(props, context)

        this.state = {
            loading: false,
            data: [],
            cursor: tree.select(props.name)
        }

        this.fetch = this.fetch.bind(this)
    }

    fetch() {
        const { promise } = this.props
        const { cursor } = this.state

        this.setState({ loading: true })

        promise.then((result) => {
            this.setState({ loading: false })
            cursor.set('data', result.data)
        })

        return promise
    }

    render() {
        const { children } = this.props
        const { loading, data } = this.state
        return children({
            data,
            loading
        })
    }
}

export default FetchReact
