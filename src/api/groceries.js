import apiUrl from '../apiConfig'
import axios from 'axios'
import env from "react-dotenv"



// Search Grocery Function -> GETs query results from external api

export const searchGrocery = (query) => {
    const searchUrl = 'https://api.spoonacular.com/food/products/search?query='

    const apiKey = env.API_KEY

    const config = {
        method: 'get',
        url: `${searchUrl+query}&addRecipeInformation=true&number=10&apiKey=${apiKey}`
    }
    return axios(config)
}

// RANDOM FUNCTION -> Gets Random limited result of recipes
export const randomGrocery = () => {
    const apiKey = env.API_KEY
    
    const searchUrl = 'https://api.spoonacular.com/food/products/random?number=10'

    const config = {
        method: 'get', 
        url: `${searchUrl}&apiKey=${apiKey}`
    }
    return axios(config)
}

// Show Function -> GETs recipe information from external api


// spoonId === spoonacular's id for the grocery

export const showGrocery = (spoonId) => {
    const apiKey = env.API_KEY
    const searchUrl = `https://api.spoonacular.com/recipes/${spoonId}/information?includeNutrition=false&apiKey=${apiKey}`

    const config = {
        method: 'get',
        url: `${searchUrl}`
    }
    return axios(config)
}

// Price Function -> GETs recipe price breakdown for each ingredient from external api


// POST -> create function
export const createRecipe = (user, newRecipe) => {
    console.log('user', user)
    console.log('this is newRecipe', newRecipe)
    return axios({
        url: `${apiUrl}/recipes`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { recipe: newRecipe }
    })
}