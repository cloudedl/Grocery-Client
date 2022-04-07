import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {removeItem, viewCart,incItem,decItem,emptyCart} from '../api/cart'
import { Form, Container, Button, Card, Link, Row, Col, ListGroup} from 'react-bootstrap'
import { AiFillDelete,AiFillPlusSquare,AiFillMinusSquare } from "react-icons/ai";

export default function Cart(props) {

    const styleObj = {
        fontSize: 20,
        color: "#4a54f1",
        textAlign: "center",
        paddingTop: "100px",
    }
    const navigate = useNavigate()
    const [cart,setCart] = useState(null)
    const [updated, setUpdated] = useState(false)
    const { user,msgAlert} = props
    let itemsDisplay
    let itemsTotal = 0

    useEffect(() => {
        viewCart(user)
            .then(res => {
                setCart(res.data.cart.items)
                
            })
            .then(()=> {
                setUpdated(false)
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
    }, [updated])

    if (!cart) {
        return <p>loading...</p>
    } 
    
    const handleAddItem = (e,itemId) => {
        //e === event
        e.preventDefault()

        incItem(user,itemId)
            .then(() => setUpdated(true))
            .then(() =>
            msgAlert({
                heading: 'Success!',
                variant: 'success',
            }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    variant: 'danger',
                }))

    }
    const handleSubItem = (e,itemId) => {
        //e === event
        e.preventDefault()

        decItem(user,itemId)
            .then(() => setUpdated(true))
            .then(() =>{
            }
            )
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    variant: 'danger'
                }))
    }


    const handleDelete = (e,itemId) => {
        //e === event
        e.preventDefault()

        removeItem(user,itemId)
            .then(() => setUpdated(true))
            .then(() =>
            msgAlert({
                heading: 'Success!',
                message: 'item removed',
                variant: 'success',
            }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'issue with removing item',
                    variant: 'danger',
                }))
    }


    
    const handleEmpty = (e) => {
        //e === event
        e.preventDefault()

        emptyCart(user)
            .then(() => setUpdated(true))
            .then(() =>
            msgAlert({
                heading: 'Success!',
                message: 'item removed',
                variant: 'success',
            }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'issue with removing item',
                    variant: 'danger',
                }))
    }
    


    // redirects to checkout page with total price
    const handleCheckout = (e) => {
        //e === event
        e.preventDefault()
        navigate('/cart/checkout',{state:{itemsTotal}})
    }




    // waits for cart to load before running code block
    if(cart.length>0) {

        // loops through the items array to get total
        for(let i=0;i<cart.length;i++) {
            itemsTotal+=parseInt(cart[i].price)*parseInt(cart[i].qty)
        }

        //cart[0].price
        itemsDisplay = cart.map( (item,index) => ( 
            <ListGroup.Item key={item._id}>
                <Row>
                    <Col className="item-info">
                        <span>{item.name}</span>
                    </Col>
                    <Col className="item-info">
                        <span>${(item.qty*item.price/100).toFixed(2)}</span>
                    </Col>
                    <Col className="item-info">
                        <span>Quantity: {item.qty}</span>
                    </Col>

                    <Col className="item-info">
                        <Form onClick={(e)=>handleAddItem(e,item._id)}>
                            <Button type="button" variant="success">
                                <AiFillPlusSquare fontSize="18px" />
                            </Button>
                        </Form>
                    </Col>
                    <Col className="item-info">
                        <Form onClick={(e)=>handleSubItem(e,item._id)}>
                            <Button type="button" variant="warning">
                                <AiFillMinusSquare fontSize="18px" />
                            </Button>
                        </Form>
                    </Col>
                    <Col className="item-info">
                        <Form onClick={(e)=>handleDelete(e,item._id)}>
                            <Button type="button" variant="danger">
                                <AiFillDelete fontSize="18px" />
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </ListGroup.Item>
        ))
    }


    return (
        <div className='cart-showpage'>
            <div className='items-container'>
                <ListGroup className="cart-list">
                    {itemsDisplay}
                </ListGroup>
            </div>
            <div className='cart-summary'>
                <span className='subtotal'>Subtotal {cart.length} items</span>
                <span style={{fontWeight: 700, fontSize:20}}>Total: $ {(itemsTotal/100).toFixed(2)} </span>
                <Button type="button" onClick={handleCheckout} disabled={cart.length===0}>Proceed to Checkout</Button>
                <Button variant="danger" type="button" onClick={handleEmpty} disabled={cart.length===0}>Remove All Items</Button>
               
            </div>
        </div>
    )
}