import apiUrl from '../apiConfig'
import axios from 'axios'
import env from "react-dotenv"

// Search Recipe Function -> GETs query results from external api
export const searchRecipe = (query) => {
    // declare base of url to be referenced later
    const apiKey = env.API_KEY
    const searchUrl = 'https://api.spoonacular.com/recipes/complexSearch?query='
    // declare api key
    
    // set terms for axios
    const config = {
        method: 'get',
        url: `${searchUrl+query}&addRecipeInformation=true&number=10&apiKey=${apiKey}`
    }
    return axios(config)
}

// RANDOM FUNCTION -> Gets Random limited result of recipes
export const randomRecipe = () => {
    const apiKey = env.API_KEY
    const searchUrl = 'https://api.spoonacular.com/recipes/random?number=10'
    
    const config = {
        method: 'get', 
        url: `${searchUrl}&apiKey=${apiKey}`
    }
    return axios(config)
}

// Show Function -> GETs recipe information from external api
// spoonId === spoonacular's id for the recipe
export const showRecipe = (spoonId) => {
    const apiKey = env.API_KEY
    const searchUrl = `https://api.spoonacular.com/recipes/${spoonId}/information?includeNutrition=false&apiKey=${apiKey}`
    
    const config = {
        method: 'get',
        url: `${searchUrl}`
    }
    return axios(config)
}

// Price Function -> GETs recipe price breakdown for each ingredient from external api
// spoonId === spoonacular's id for the recipe
export const ingPrice = (spoonId) => {
    const apiKey = env.API_KEY
    const searchUrl = `https://api.spoonacular.com/recipes/${spoonId}/priceBreakdownWidget.json?apiKey=${apiKey}`
    

    const config = {
        method: 'get',
        url: `${searchUrl}`
    }
 
    return axios(config)

}


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


