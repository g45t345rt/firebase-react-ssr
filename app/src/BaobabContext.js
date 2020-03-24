import React from 'react'
const BaobabContext = React.createContext()
export default BaobabContext

export const root = (tree, Component) => {
    const value = { tree }

    const ComposedComponent = class extends React.Component {
        render () {
            return <BaobabContext.Provider value={value}>
                <Component {...this.props} />
            </BaobabContext.Provider>
        }
    }

    return ComposedComponent
}
