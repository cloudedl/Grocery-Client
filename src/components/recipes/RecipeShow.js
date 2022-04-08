import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { showRecipe,ingPrice } from '../../api/recipes'
import {addItem} from '../../api/cart'
import { Form, Container, Button, Card, Link, Row, Col, ListGroup, Spinner } from 'react-bootstrap'
import {addToFavorites} from '../../api/recipes'






const RecipeShow = (props) => {

    
    const navigate = useNavigate()
    const [recipe,setRecipe] = useState(null)
    // ings === ingredients
    const [ings,setIngs] = useState(null)
    const [ingArray,setIngArray] = useState([])
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
                setIngArray (res.data.ingredients)
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
        return<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
      </Spinner>
    } 
    const handleAddIng = (e,index) => {
        //e === event
        e.preventDefault()


            let ingObj = {
                "name":  ingArray[index].name,
                "price": ingArray[index].price
            }
        addItem(user,ingObj)
            .then()
            .then(() =>
            msgAlert({
                heading: 'Success!',
                message: 'item added',
                variant: 'success',
            }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'issue with add item',
                    variant: 'danger',
                }))



    }

    const handleAddAll = (e) => {
        //e === event
        e.preventDefault()

      let ingFixedArr = []



        for (let i = 0; i<ingArray.length;i++) {
            let ingObj = {
                "name":  ingArray[i].name,
                "price": ingArray[i].price
            }
            ingFixedArr.push(ingObj)
        }

    const addItemArr = () => {
        ingFixedArr.map( ingredient=> {
            addItem(user,ingredient)
            .then()
        // if there is an error, we'll send an error message
        .catch(() =>
            msgAlert({
                heading: 'Oh No!',
                message: 'issue with add item',
                variant: 'danger',
            }))
        }) 
    }

    addItemArr()

}


    

    const recipeCard = ingArray.map( (ingredient,index) => ( 

       

        <ListGroup.Item
        as="li"
         className="d-flex justify-content-between align-items-start"
         style = {{backgroundColor: "rgb(255,255,230)"}}
         >
             <div className="ms-2 me-auto">
                  <div className="fw-bold">{ingredient.amount.us.value} {ingredient.amount.us.unit} {ingredient.name}</div>
                     Price: ${(ingredient.price / 100).toFixed(2)}
                  </div>
            <Form onClick={(e)=>handleAddIng(e,index)}>         
                 <Button fluid ="true" style = {{backgroundColor: "rgb(83, 200, 70)" , border: "rgb(83, 200, 70)"}}type='submit'>Add Item to Cart</Button>
            </Form>
  </ListGroup.Item>

    ))
    const handleFavorite = (e) => {
        //e === event
        e.preventDefault()

        console.log('what is user', user)
        console.log('what is recipe', recipe)
        addToFavorites(user, recipe)

        // then we send a success message
        .then(() =>
            msgAlert({
                heading: 'Recipe Added! Success!',
                message: 'Added recipe to favorites',
                variant: 'success',
            }))
        // if there is an error, we'll send an error message
        .catch(() =>
            msgAlert({
                heading: 'Oh No!',
                message: 'Failed to add to favorites',
                variant: 'danger',
            }))
    // console.log('this is the pet', pet)
   }
    
    
    let re = recipe.instructions.replace(/<ol>|<li>/g, " ") 
    return (
        <>

            
            <h3 style ={{textAlign : "center"}}>{recipe.title}</h3>
            <Container >
                <Row>
                    <Col style = {{
                backgroundColor: "rgb(255,255,230)",
                maxHeight: "356px",
                overflowY: "scroll",
            }}><p><strong>Instructions:</strong> {re}</p></Col>
                     <Col><img src= {`${recipe.image}`}></img></Col>
                </Row>  
            </Container>
            <Container style = {{width: "50%"}}>
                <ListGroup  as="ol" numbered>
                 <div>{recipeCard}</div>
                </ListGroup>
            </Container>
            <div style={{textAlign: "center"}}>
                <Form onSubmit={handleAddAll}>
                    <Button style = {{backgroundColor: "rgb(83, 200, 70)" , border: "rgb(83, 200, 70)"}}type='submit'>Add Recipe to Cart</Button>
                </Form>
                <Form onSubmit={handleFavorite}>
                    <Button style = {{backgroundColor: "rgb(83, 200, 70)" , border: "rgb(83, 200, 70)"}}type='submit'>Add Recipe to Favorites</Button>
                </Form>
                </div>
       
        </>
    )
}

export default RecipeShow