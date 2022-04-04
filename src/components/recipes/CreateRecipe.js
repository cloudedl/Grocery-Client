import React, { useState } from 'react'
import { createRecipe } from '../../api/recipes'
import { useNavigate } from 'react-router-dom'
import RecipeForm from '../shared/RecipeForm'
import { createRecipeFailure } from '../shared/AutoDismissAlert/messages'
import { createRecipeSuccess } from '../shared/AutoDismissAlert/messages'

// create pet renders a form and calls createPet function
// maybe redirect(navigate) to the new pet show page
// props we'll need are user, msgAlert
const CreateRecipe = (props) => {
    const {user, msgAlert} = props
    console.log('user in create', user)
    const navigate = useNavigate()
    // we'll need two states
    const [recipe, setRecipe] = useState({name: '', description: ''})
    console.log('recipe in create', recipe)
  
    const handleChange = (e) => {
        // e === event
        e.persist()

        setRecipe(prevRecipe => {
            const name = e.target.name
            let value = e.target.value

            const updatedValue = { [name]: value }

            console.log('prevRecipe', prevRecipe)
            console.log('updatedValue', updatedValue)

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

    return (
        <RecipeForm
            recipe={recipe}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add new Recipe!"
        />
    )
}

export default CreateRecipe