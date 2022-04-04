import Recipe from './Recipe'
import Cart from './Cart'
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

	const [recipes, setRecipes] = useState(null)

	useEffect(() => {
		randomRecipe()
		.then(res => {
			setRecipes(res.data.recipes)
			console.log('apiresponse', res.data)
		})
		.catch(console.error)
	}, [])

	if (!recipes) {
        return <p>loading...</p>
    }  else if (recipes.length === 0) {
        return <p>No recipes found</p>
    }

    let recipeCards

    if (recipes.length > 0) {
        console.log('is this being hit')
        recipeCards = recipes.map(recipes => (
            <Card 
            bg={"light"}
            border = "dark" 
            key={recipes.id} 
            style={{ width: '20%', 
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            fontFamily: "Times New Roman" }} 
            className="m-2">
                <Card.Img 
                style = {{rounded : true}} 
                border = "dark"
                variant = 'top' 
                src ={ `${recipes.image}`}/>
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
			<h2>'companynamehere'</h2>
			<strong><em>A revolutionary way to shop</em></strong>

			
            <div style={cardContainerLayout}>
                {recipeCards}
                
            </div>
		</>
	)
}

export default Home
