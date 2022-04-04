import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { showRecipe,ingPrice } from '../../api/recipes'
import { Form, Container, Button } from 'react-bootstrap'





const RecipeShow = (props) => {

    const navigate = useNavigate()
    const [recipe,setRecipe] = useState(null)
    // ings === ingredients
    const [ings,setIngs] = useState(null)
    const { user,msgAlert} = props
    const {id} = useParams()

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
    const handleSubmit = (e) => {
        //e === event
        e.preventDefault()
        //current navigate just to test handleSubmit
        navigate('/recipe')
    }

    return (
        <>
            <h3>{recipe.title}</h3>
            <Container className='justify-content-center'>
            <Form onSubmit={handleSubmit}>
            <Button type='submit'>Add to Cart</Button>
            </Form>
        </Container>
        </>
    )
}

export default RecipeShow