import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { showGrocery } from '../../api/groceries'
import { Form, Container, Button, Card } from 'react-bootstrap'
import {addItem} from '../../api/cart'

// declare component
const GroceryShow = (props) => {
    // declare variables 
    const navigate = useNavigate()
    const [grocery,setGrocery] = useState(null)
    const [ings,setIngs] = useState(null)
    const { user,msgAlert} = props
    const {id} = useParams()
    // console log to check what object is currently associated with grocery
    console.log(grocery, "this is the grocery")
    useEffect(() => {
        showGrocery(id)
            .then(res => {
                setGrocery(res.data)
                console.log('apiresponse',res.data)

            })
            .then(() =>
                msgAlert({
                    heading: 'Success!',
                    message: `grocery show page`,
                    variant: 'success',
                }))
            .catch(()=> {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Issue with showing grocery',
                    variant: 'danger',
                })})
   
    }, [])
    
    // function to handle submit button
    const handleSubmit = (e) => {
        //e === event
        e.preventDefault()
        //current navigate just to test handleSubmit
        navigate('/grocery')
    }

    // something to show while grocery is loading
    if (!grocery) {
        return <p>loading...</p>
    } 

    const handleAddIng = (e,index) => {
        //e === event
        e.preventDefault()

            let correctPrice = grocery.price * 100
            console.log('what is correct price', correctPrice)
            let ingObj = {
                "name":  grocery.title,
                "price": correctPrice
            }

            console.log('what is inside ingObj', ingObj)
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

    return (
        <>
            <img src={grocery.image}/>
            <h3>{grocery.title}</h3>
            <div>{grocery.generatedText}</div>
            <aside>Price: ${grocery.price}</aside>
            <Container
            className='justify-content-center'>
                <Form onSubmit={handleAddIng}>
                    <Button style ={{marginTop: "2%", backgroundColor: "rgb(83, 200, 70)" , border: "rgb(83, 200, 70)"}} type='submit'>Add to Cart</Button>
                </Form>
            </Container>
        </>
    )
}

export default GroceryShow