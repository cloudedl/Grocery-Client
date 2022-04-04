import apiUrl from '../apiConfig'
import axios from 'axios'



// Search Recipe Function -> GETs results from recipe query

export const searchRecipe = (query) => {
    const searchUrl = 'https://api.spoonacular.com/recipes/complexSearch?query='
    const apiKey = 'INPUT API KEY HERE'

    const config = {
        method: 'get',
        url: `${searchUrl+query}&addRecipeInformation=true&number=10&apiKey=${apiKey}`
    }
    return axios(config)
}

// Show Function -> GETs recipe information 

// Price Function -> GETs recipe price breakdown for each ingredient


