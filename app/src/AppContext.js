import React from 'react'
const AppContext = React.createContext()
export default AppContext

export const root = (value, Component) => {
    const ComposedComponent = class extends React.Component {
        render () {
            return <AppContext.Provider value={value}>
                <Component {...this.props} />
            </AppContext.Provider>
        }
    }

    return ComposedComponent
}
