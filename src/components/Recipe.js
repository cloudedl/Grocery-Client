import React, {useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'

export default function Recipe(props) {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Recipe Name</Card.Title>
                    <Card.Text>
                        Recipe text that fades after a certain point
                    </Card.Text>
                    <Button variant="primary">Go to Recipe</Button>
                    <Button variant="primary">Add ings to cart</Button>
                </Card.Body>
            </Card>
        </>
    )
}