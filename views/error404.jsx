const React = require('react')
const Default = require('./layouts/Default')

function error404({error}) {
    return(
        <Default>
            <h2>Error 404: Page Not Found</h2>
            <p>{error.value}</p>
    </Default>
    )
}

module.exports = error404;