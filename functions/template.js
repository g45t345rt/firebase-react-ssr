module.exports = ({ helmet, body, treeData, styles }) => {
    return `<!DOCTYPE html>
    <html>
        <head>
            ${helmet.title.toString()}
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1" />  
            ${styles}
        </head>
        <body>
            <div id="root">${body}</div>
        </body>
        <script>
            window.__treeData = ${treeData}
        </script>
        <script src='/client.bundle.js'></script>
    </html>`
}
