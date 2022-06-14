// load react
const React = require("react");

// grab default layout (this holds our default function)
const Default = require("./layouts/default");

// pass in an object called breads 
function Index ({breads, bakers, title}) {
    return (
        // return the output of the Default function - children is h2 -> Index Page
        <Default title = {title}>
            <h2>Index Page</h2>
            <h3>Bakers</h3>
            <ul>
                {
                    bakers.map(baker => {
                        return(
                        <li key={baker.id}>
                            <a href={`/bakers/${baker.id}`}>{baker.name}</a>
                        </li>
                        )
                    })
                }
            </ul>
            <h3>Breads</h3>
            {/* create a new unordered list */}
            <ul>
                {
                    // map through the passed in bread object array
                    breads.map((bread) => {
                        // for each item in the array, return a list element
                        // each list element will have a key (unique identifier) based on where it is located in the array
                        return (
                            <li key = {bread.id}>
                                {/* inside the list element, put in the bread name */}
                                {/* href sends the browser to the page with just the single bread on it */}
                                {/* bread.id is the id associated with each object in the bread database */}
                                <a href ={`/breads/${bread.id}`}>
                                    {bread.name}
                                </a>  
                            </li>
                        )

                    })
                }
            </ul>
            <div className="newButton">
                <a href="/breads/new"><button>Add a new bread</button></a>
            </div>

        </Default>
    )
}

// export the Index function
module.exports = Index;