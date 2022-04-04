import Recipe from './Recipe'
import Cart from './Cart'
import { Card } from 'react-bootstrap'
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
            <Card key={recipes.id} style={{ width: '30%' }} className="m-2">
                <Card.Header>{recipes.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/recipe/${recipes.id}`}>View Recipe Details</Link>
                    </Card.Text>
                </Card.Body>
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
