import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { showRecipe,ingPrice } from '../../api/recipes'
import { Form, Container, Button, Card, Link, Row, Col } from 'react-bootstrap'





const RecipeShow = (props) => {

    const navigate = useNavigate()
    const [recipe,setRecipe] = useState(null)
    // ings === ingredients
    const [ings,setIngs] = useState(null)
    const { user,msgAlert} = props
    const {id} = useParams()
    console.log("recipe", recipe, "this is the total cost")
   
    useEffect(() => {
        showRecipe(id)
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

                <Card.Body>
                <Card.Title>{ingredient.amount.us.value} {ingredient.amount.us.unit} {ingredient.name}</Card.Title>
                <p>Price: ${(ingredient.price / 100).toFixed(2)}</p>
                </Card.Body>
                <Card.Footer>
                    <Card.Text>
                    
                    <div className="d-grid gap-2">
                    <Form onSubmit={handleSubmit}>
                     <Button fluid ="true" type='submit'>Add Item to Cart</Button>
                     </Form>
                       
                     </div>   
                    </Card.Text>
                    </Card.Footer>
                
            </Card>

    )

    )

    return (
        <>

            
            <h3 style ={{textAlign : "center"}}>{recipe.title}</h3>
            <Container>
                <Row>
                    <Col><p>Instructions: {recipe.instructions}</p></Col>
                     <Col><img src= {`${recipe.image}`}></img></Col>
                </Row>  
            </Container>
            <div>{recipeCard}</div>
          
            <Container className='justify-content-center'>
                
            <Form onSubmit={handleSubmit}>
            <Button type='submit'>Add Recipe to Cart</Button>
            </Form>
        </Container>
        </>
    )
}

export default RecipeShow