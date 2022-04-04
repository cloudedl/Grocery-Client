import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { showRecipe } from '../../api/recipes'




const RecipeShow = (props) => {

    const [recipe,setRecipe] = useState(null)
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
    }, [])



    if (!recipe) {
        return <p>loading...</p>
    } 


    return (
        <>
            <h3>{recipe.title}</h3>
            <div >

                
            </div>
        </>
    )
}

export default RecipeShow