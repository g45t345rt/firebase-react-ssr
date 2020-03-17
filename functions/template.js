module.exports = ({ body, initialState }) => {
    return `<html lang="en">
        <head>
            <title>Firebase REACT SSR</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />          
        </head>
        <body>
            <div id="root">${body}</div>
        </body>
        <script>
            window.__initialState = ${initialState}
        </script>
        <script src='/client.bundle.js'></script>
    </html>`
}
