// import dependencies
// import Recipe from './Recipe'
// import Cart from './Cart'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { randomRecipe } from '../api/recipes'
import { useEffect, useState } from 'react'

// styling object for recipe cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
    // destructure from useState
	const [recipes, setRecipes] = useState(null)

    // useEffect for random recipes to display on page
	useEffect(() => {
		randomRecipe()
		.then(res => {
			setRecipes(res.data.recipes)
			console.log('apiresponse', res.data)
		})
		.catch(console.error)
	}, [])

    // message for waiting for results/when no results are found
	if (!recipes) {
        return <p>loading...</p>
    }  else if (recipes.length === 0) {
        return <p>No recipes found</p>
    }

    // declare recipeCards variable to use later on
    let recipeCards

    // displaying random recipes returned from api call
    // first, detect if any were returned
    if (recipes.length > 0) {
        // console.log('is this being hit')
        // setting value to recipeCards declared earlier
        // using map() to create an array of random recipe cards
        recipeCards = recipes.map(recipes => (
            <Card 
                bg={"light"}
                border = "dark" 
                key={recipes.id} 
                style={{ width: '20%', 
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                fontFamily: "Times New Roman" }} 
                className="m-2"
            >
                <Card.Img 
                    style = {{rounded : true}} 
                    border = "dark"
                    variant = 'top' 
                    src ={ `${recipes.image}`}   
                />
                <Card.Body>
                    <Card.Title style={{textAlign : "center"}}>{recipes.title}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <Card.Text>
                        <div className="d-grid gap-2">
                            <Button variant ="primary" size = "sm">
                                <Link style={{color : "white"}} to={`/recipe/${recipes.id}`}>View Recipe</Link>
                            </Button>
                        </div>   
                    </Card.Text>
                </Card.Footer>
            </Card>
        ))
    }

	return (
		<>
			<h2>NutriCart</h2>
			<strong><em>A revolutionary way to shop</em></strong>

			
            <div style={cardContainerLayout}>
                {recipeCards}
                
            </div>
		</>
	)
}

export default Home
