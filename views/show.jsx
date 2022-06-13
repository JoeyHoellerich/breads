// require React
const React = require("react");

// get default html wrapper
const Default = require("./layouts/default.jsx");

// create function to show some bread, data passed in will be an object - we name bread
function Show({bread}) {
    console.log(bread.name)
        return (
            <Default>
                <h2>Show Page</h2>
                <h3>{bread.name}</h3>
                <p>
                    and it 
                    {/* if bread.hasGluten is true -> does, if bread.hasGluten is falst -> does NOT */}
                    {
                        bread.hasGluten 
                        ? <span> does </span>
                        : <span> does NOT </span>
                    }
                    have gluten.
                </p>
                <img src = {bread.image} alt = {bread.name}></img>
                <p> {bread.getBakedBy()} </p>
                <li> <a href = "/breads">Go Home</a></li>

                <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>

                
                <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
                    <input type='submit' value="DELETE"/>
                </form> 

            </Default>
        )
} 

// export show function
module.exports = Show;