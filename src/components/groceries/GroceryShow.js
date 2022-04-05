import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { showGrocery } from '../../api/groceries'
import { Form, Container, Button, Card } from 'react-bootstrap'





const GroceryShow = (props) => {

    const navigate = useNavigate()
    const [grocery,setRecipe] = useState(null)
    // ings === ingredients
    // const [ings,setIngs] = useState(null)
    const { user,msgAlert} = props
    const {id} = useParams()
    console.log(grocery, "this is the grocery")
    useEffect(() => {
        showGrocery(id)
            .then(res => {
                setRecipe(res.data)
                console.log('apiresponse',res.data)

            })
            .then(() =>
                msgAlert({
                    heading: 'Success!',
                    message: `recipe show page`,
                    variant: 'success',
                }))
            .catch(()=> {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Issue with showing recipe',
                    variant: 'danger',
                })})
        ingPrice(id)
            .then(res => {
                setIngs(res.data)
                console.log('apiresponse',res.data)

            })
            .catch(()=> {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Issue with showing recipe',
                    variant: 'danger',
                })})
    }, [])



    if (!recipe) {
        return <p>loading...</p>
    } 
    const handleSubmit = (e) => {
        //e === event
        e.preventDefault()
        //current navigate just to test handleSubmit
        navigate('/recipe')
    }
    let ingArray = ings.ingredients
    console.log('this is ingArray', ingArray)
    const recipeCard = ingArray.map( ingredient=> ( 
        <Card 
            bg={"light"}
            border = "dark" 
            key={ingredient.id} 
            style={{ width: '20%', 
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            fontFamily: "Times New Roman" }} 
            className="m-2">
                <Card.Img 
                style = {{rounded : true}} 
                border = "dark"
                variant = 'top' 
                src ={ `${ingredient.image}`}/>
                <Card.Body>
                <Card.Title style={{textAlign : "center"}}>{ingredient.name}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <Card.Text>
                    {/* <div className="d-grid gap-2">
                        <Button variant ="primary" size = "sm">
                        <Link style={{color : "white"}} to={`/recipe/${result.id}`}>View Recipe</Link>
                        </Button>
                     </div>    */}
                    </Card.Text>
                    </Card.Footer>
                
            </Card>

    ))

    return (
        <>

        
            <h3>{recipe.title}</h3>
            <div>{recipeCard}</div>
            <Container className='justify-content-center'>
            <Form onSubmit={handleSubmit}>
            <Button type='submit'>Add to Cart</Button>
            </Form>
        </Container>
        </>
    )
}

export default RecipeShow