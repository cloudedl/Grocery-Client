// import dependencies
// import Recipe from './Recipe'
// import Cart from './Cart'
import { Card, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { randomRecipe } from '../api/recipes'
import { useEffect, useState } from 'react'
import RecipeShow from './recipes/RecipeShow'

// styling object for recsipe cards
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
        return <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
      </Spinner>
    }  else if (recipes.length === 0) {
        return <p>No recipes found</p>
    }

    // declare recipeCards variable to use later on
    let recipeCards
    const checkImage = () => {
        if (!recipes.image) {
             recipes.image = "https://i.imgur.com/LAuI4Yc.png"
        }
    }
    // displaying random recipes returned from api call
    // first, detect if any were returned
    if (recipes.length > 0) {
       

        
        // console.log('is this being hit')
        // setting value to recipeCards declared earlier
        // using map() to create an array of random recipe cards
        recipeCards = recipes.map(recipes => (
            checkImage(),
            <Card 
                // bg={"light"}
                border = "light" 
                key={recipes.id} 
                style={{ width: '20%', 
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                fontFamily: "Times New Roman", 
                backgroundColor: "rgb(255,255,230)"}} 
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
                            <Button style = {{backgroundColor: "rgb(83, 200, 70)", border: "rgb(83, 200, 70)"}} size = "sm">
                                <Link style={{color : "white", textDecoration : "none"}} to={`/recipe/${recipes.id}`}>View Recipe</Link>
                            </Button>
                        </div>   
                    </Card.Text>
                </Card.Footer>
            </Card>
        ))
    }

	return (
		<>
        <div style = {{
            backgroundColor : "rgb(254,249, 222)",
        }}> 
			<h2 style ={{color: "rgb(83,126,70)", marginLeft: "10px"}}>  NutriCart</h2>
			<strong style ={{color: "rgb(83,126,70)", marginLeft: "10px"}}><em>A revolutionary way to shop</em></strong>

			
            <div style={cardContainerLayout}>
                {recipeCards}
                
            </div>
        </div>   
		</>
	)
}

export default Home
