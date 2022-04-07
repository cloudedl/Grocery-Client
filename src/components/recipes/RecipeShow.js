import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { showRecipe,ingPrice } from '../../api/recipes'
import {addItem} from '../../api/cart'
import { Form, Container, Button, Card, Link, Row, Col, ListGroup } from 'react-bootstrap'






const RecipeShow = (props) => {

    // let re = recipe.instructions.replace(/<ol>/gi, " ")
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
        return <p>loading...</p>
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

    )

    )

    return (
        <>

            
            <h3 style ={{textAlign : "center"}}>{recipe.title}</h3>
            <Container >
                <Row>
                    <Col style = {{
                backgroundColor: "rgb(255,255,230)",
                maxHeight: "356px",
                overflowY: "scroll",
            }}><p><strong>Instructions:</strong> {recipe.instructions.replace(/<ol>|<li>/gi, "")}</p></Col>
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
                </div>
       
        </>
    )
}

export default RecipeShow





// FROM CONSOLE LOG INGARRAY 
// const ingArray = [
//     {
//         "name": "all purpose flour",
//         "image": "flour.png",
//         "price": 16.67,
//         "amount": {
//             "metric": {
//                 "value": 125,
//                 "unit": "g"
//             },
//             "us": {
//                 "value": 1,
//                 "unit": "cup"
//             }
//         }
//     },
//     {
//         "name": "canned beer",
//         "image": "beer.jpg",
//         "price": 183.7,
//         "amount": {
//             "metric": {
//                 "value": 340.194,
//                 "unit": "g"
//             },
//             "us": {
//                 "value": 12,
//                 "unit": "oz"
//             }
//         }
//     },
//     {
//         "name": "diced bell pepper",
//         "image": "bell-pepper-orange.png",
//         "price": 59.76,
//         "amount": {
//             "metric": {
//                 "value": 1,
//                 "unit": ""
//             },
//             "us": {
//                 "value": 1,
//                 "unit": ""
//             }
//         }
//     },
//     {
//         "name": "cajun seasoning",
//         "image": "chili-powder.jpg",
//         "price": 87.75,
//         "amount": {
//             "metric": {
//                 "value": 27,
//                 "unit": "g"
//             },
//             "us": {
//                 "value": 0.25,
//                 "unit": "cup"
//             }
//         }
//     },
//     {
//         "name": "diced canned tomatoes",
//         "image": "tomatoes-canned.png",
//         "price": 60.75,
//         "amount": {
//             "metric": {
//                 "value": 283.495,
//                 "unit": "g"
//             },
//             "us": {
//                 "value": 10,
//                 "unit": "oz"
//             }
//         }
//     },
//     {
//         "name": "diced canned tomatoes",
//         "image": "tomatoes-canned.png",
//         "price": 88.09,
//         "amount": {
//             "metric": {
//                 "value": 411.068,
//                 "unit": "g"
//             },
//             "us": {
//                 "value": 14.5,
//                 "unit": "oz"
//             }
//         }
//     },
//     {
//         "name": "diced celery",
//         "image": "celery.jpg",
//         "price": 90.13,
//         "amount": {
//             "metric": {
//                 "value": 6,
//                 "unit": "stalks"
//             },
//             "us": {
//                 "value": 6,
//                 "unit": "stalks"
//             }
//         }
//     },
//     {
//         "name": "canned chicken broth",
//         "image": "chicken-broth.png",
//         "price": 396.39,
//         "amount": {
//             "metric": {
//                 "value": 1.233,
//                 "unit": "kilogram"
//             },
//             "us": {
//                 "value": 43.5,
//                 "unit": "oz"
//             }
//         }
//     },
//     {
//         "name": "cooked chicken breasts",
//         "image": "cooked-chicken-breast.png",
//         "price": 1076.72,
//         "amount": {
//             "metric": {
//                 "value": 3,
//                 "unit": ""
//             },
//             "us": {
//                 "value": 3,
//                 "unit": ""
//             }
//         }
//     },
//     {
//         "name": "extra virgin olive oil",
//         "image": "olive-oil.jpg",
//         "price": 257.31,
//         "amount": {
//             "metric": {
//                 "value": 216,
//                 "unit": "ml"
//             },
//             "us": {
//                 "value": 1,
//                 "unit": "cup"
//             }
//         }
//     },
//     {
//         "name": "garlic powder",
//         "image": "garlic-powder.png",
//         "price": 29.45,
//         "amount": {
//             "metric": {
//                 "value": 1,
//                 "unit": "Tbsp"
//             },
//             "us": {
//                 "value": 1,
//                 "unit": "Tbsp"
//             }
//         }
//     },
//     {
//         "name": "parsley",
//         "image": "parsley.jpg",
//         "price": 30.1,
//         "amount": {
//             "metric": {
//                 "value": 2,
//                 "unit": "Tbsps"
//             },
//             "us": {
//                 "value": 2,
//                 "unit": "Tbsps"
//             }
//         }
//     },
//     {
//         "name": "diced sweet onion",
//         "image": "sweet-onion.png",
//         "price": 94.89,
//         "amount": {
//             "metric": {
//                 "value": 1,
//                 "unit": ""
//             },
//             "us": {
//                 "value": 1,
//                 "unit": ""
//             }
//         }
//     }
// ]