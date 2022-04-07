import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const RecipeForm = (props) => {
    
    const {recipe, handleChange, handleSubmit, heading} = props
    //     console.log(recipe)
    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    placeholder="Title of Recipe"
                    value= {recipe.name}
                    name='name'
                    onChange={handleChange}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    placeholder="Type a description of your recipe"
                    value= {recipe.description}
                    name='description'
                    onChange={handleChange}
                />   
                <Form.Label>Instructions</Form.Label>
                <Form.Control 
                    placeholder="Type the steps to make your recipe"
                    value= {recipe.instructions}
                    name='instructions'
                    onChange={handleChange}
                />
            
                
                <Button style ={{marginTop: "2%"}} type='submit'>Submit</Button>
            </Form>
            
        </Container>
    )
}

export default RecipeForm