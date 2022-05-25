// require the react framework
const React = require("react");

// define a function that defines the boilerplate HMTL layout
function Default(html) {
    return (
        <html>
            <head>
                <title>Default</title>
            </head>
            <body>
                <h1>HTML Rendered!</h1>
                <div className="container">
                    {/* data passed into the function - you want the child elements */}
                    {html.children}
                </div>
            </body>
        </html>
    )
}

// export the Default function
module.exports = Default