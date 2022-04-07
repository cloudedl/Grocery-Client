import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import "../../index.css"

const RecipeSearch = (props) => {

    const navigate = useNavigate()

    const [query,setQuery] = useState(null)

    // updates query anytime input field is updated
    const handleChange = (e) => {
        // e === event
        e.persist()

        
        setQuery(prevQuery => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget', e.target)

            const updatedValue = { [name]: value }

            console.log('prevQuery', prevQuery)
            console.log('updatedValue', updatedValue)

            return {...prevQuery, ...updatedValue}
        })
    }


    // redirects to results page with query string on submit
    const handleSubmit = (e) => {
        //e === event
        e.preventDefault()
        navigate('/recipe/results',{state:{query}})
    }


    return (
        
     <div>
        <Container style={{ 
            marginTop: "10%",
            padding: "10px",
            width: '50%', 
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            fontFamily: "Times New Roman", 
            backgroundColor: "rgb(255,255,230)"
            }}
            className='justify-content-center'>
            <Form onSubmit={handleSubmit}>
                <Form.Control 
                    placeholder="Search Recipe"
                    name='recipe'
                    onChange={handleChange}
                />
            <Button className = "formButton" style ={{ backgroundColor: "rgb(83, 200, 70)" , border: "rgb(83, 200, 70)", marginTop: "2%" }} type='submit'>Submit</Button>
            </Form>
        </Container>
        </div> 

    )

}


export default RecipeSearch

