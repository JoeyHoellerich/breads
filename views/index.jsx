// load react
const React = require("react");

// grab default layout (this holds our default function)
const Default = require("./layouts/default");

// pass in an object called breads 
function Index ({breads, title}) {
    return (
        // return the output of the Default function - children is h2 -> Index Page
        <Default title = {title}>
            {/* create a new unordered list */}
            <ul>
                {
                    // map through the passed in bread object array
                    breads.map((bread, index) => {
                        // for each item in the array, return a list element
                        // each list element will have a key (unique identifier) based on where it is located in the array
                        return (
                            <li key = {index}>
                                {/* inside the list element, put in the bread name */}
                                {/* href sends the browser to the page with just the single bread on it */}
                                <a href ={`/breads/${index}`}>
                                    {bread.name}
                                </a>  
                            </li>
                        )

                    })
                }
            </ul>
        </Default>
    )
}

// export the Index function
module.exports = Index;