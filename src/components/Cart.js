import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {removeItem, viewCart,incItem} from '../api/cart'
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
    const [itemsArr,setItemsArr] = useState([])
    const { user,msgAlert} = props
    console.log('this is user',user._id)
    useEffect(() => {
        viewCart(user)
            .then(res => {
                setCart(res.data.cart.items)
                
            })
            .then(()=> {
                console.log('this is cart',cart)
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
    }, [cart])

    if (!cart) {
        return <p>loading...</p>
    } 

    const handleAddItem = (e,itemId) => {
        //e === event
        e.preventDefault()

        incItem(user,itemId)
            .then(() => {navigate('/cart/view')})
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


    const handleDelete = (e,itemId) => {
        //e === event
        e.preventDefault()

        removeItem(user,itemId)
            .then(() => {navigate('/cart/view')})
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




    let itemsDisplay

    if(cart.length>0) {
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
                        <Button
                            type="button"
                            variant="warning"
                        >
                            <AiFillMinusSquare fontSize="18px" />
                        </Button>
                        
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
                <span style={{fontWeight: 700, fontSize:20}}>Total: </span>
                <Button type="button" disabled={cart.length===0}>Proceed to Checkout</Button>
            </div>
        </div>
    )
}