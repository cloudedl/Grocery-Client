import React, { useState } from 'react'
import { createRecipe } from '../../api/recipes'
import { useNavigate } from 'react-router-dom'
import RecipeForm from '../shared/RecipeForm'
import { createRecipeFailure } from '../shared/AutoDismissAlert/messages'
import { createRecipeSuccess } from '../shared/AutoDismissAlert/messages'
import { Form, Container, Button } from 'react-bootstrap'
import { searchIng, showIng, createIngredient } from '../../api/groceries'

// create pet renders a form and calls createPet function
// maybe redirect(navigate) to the new pet show page
// props we'll need are user, msgAlert
const CreateRecipe = (props) => {
    const {user, msgAlert} = props
    // console.log('user in create', user)
    const navigate = useNavigate()
    // we'll need two states
    const [recipe, setRecipe] = useState({name: '', description: '', instructions: ''})
    const [ingredient, setIngredient] = useState({ingredient: '', price: '', amount: '' })
    const [ingredientArr, setingredientArr] = useState(null)
    // console.log('recipe in create', recipe)
  
    const handleChange = (e) => {
        // e === event
        e.persist()

        setRecipe(prevRecipe => {
            const name = e.target.name
            let value = e.target.value

            const updatedValue = { [name]: value }

            // console.log('prevRecipe', prevRecipe)
            // console.log('updatedValue', updatedValue)

            return {...prevRecipe, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        createRecipe(user, recipe)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/recipes/${res.data.recipe.id}`)})

            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Recipe Added! Success!',
                    message: createRecipeSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createRecipeFailure,
                    variant: 'danger',
                }))
        // console.log('this is the pet', pet)
    }

    const handleIngChange = (e) => {
        // e === event
        e.persist()

        setIngredient(prevIngredient => {
            const name = e.target.name
            let value = e.target.value

            const updatedValue = { [name]: value }

            // console.log('prevIngredient', prevIngredient)
            // console.log('updatedValue', updatedValue)
            // console.log('what is ingredient.name', ingredient.name)

            return {...prevIngredient, ...updatedValue}
        })
    }

    const handleIngSubmit = (e) => {
        // e === event
        e.preventDefault()
        let searchData 
        let ingredientData
        // const {name, amount } = ingredientData
        // const { value } = ingredientData.estimatedCost
        

        searchIng(ingredient.ingredient)
            // if create is successful, onionsage
            .then((res) => {searchData = res.data})
            .then(() => {console.log('what is data before 2nd api call', searchData.results[0])})
            .then(() => {showIng(searchData.results[0].id, ingredient.amount)
                .then((res) => {ingredientData = res.data})
                .then((res) => {console.log('what is data', searchData, 'and what is res.data', ingredientData, 'what is ingredientState', ingredient, 'what is ingredientdata.estimatedcost.value', ingredientData.estimatedCost.value )})
                .catch(console.error)})
            .then(() => setIngredient( {ingredient: ingredientData.name, price: ingredientData.estimatedCost.value, amount: ingredientData.amount}))
            .then(() => {console.log('what is ingredint after updating state', ingredient)})
            .then(() =>
                msgAlert({
                    heading: ' Added! Success!',
                    message: createRecipeSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createRecipeFailure,
                    variant: 'danger',
                }))
        // console.log('this is the pet', pet)
    }

    return (
        <>
            <RecipeForm
                recipe={recipe}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                heading="Add new Recipe!"
            />
            <Form onSubmit={handleIngSubmit}>
            <Form.Label>Ingredient</Form.Label>
                    <Form.Control 
                        placeholder="Add an ingredient"
                        value= {ingredient.ingredient}
                        name='ingredient'
                        onChange={handleIngChange}
            />
            <Form.Label>Amount</Form.Label>
                    <Form.Control 
                        placeholder="Amount in oz"
                        value= {ingredient.amount}
                        name='amount'
                        onChange={handleIngChange}
            />
            <Button type='submit'>Add to Recipe</Button>
            </Form>
        </>
    )
}

export default CreateRecipe