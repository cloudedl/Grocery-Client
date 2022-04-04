import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'




const GrocerySearch = (props) => {

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
        navigate('/grocery/results',{state:{query}})
    }


    return (
        <Container className='justify-content-center'>
            <Form onSubmit={handleSubmit}>
                <Form.Control 
                    placeholder="Search Grocery"
                    name='grocery'
                    onChange={handleChange}
                />
            <Button type='submit'>Submit</Button>
            </Form>
        </Container>

    )

}


export default GrocerySearch