import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'




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
        <Container style={{ 
            width: '50%', 
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            fontFamily: "Times New Roman", 
            }}
            className='justify-content-center'>
            <Form onSubmit={handleSubmit}>
                <Form.Control 
                    placeholder="Search Recipe"
                    name='recipe'
                    onChange={handleChange}
                />
            <Button type='submit'>Submit</Button>
            </Form>
        </Container>

    )

}


export default RecipeSearch

