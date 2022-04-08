import apiUrl from '../apiConfig'
import axios from 'axios'
import env from "react-dotenv"

// Search Favorites Function -> GETs query results from localhost
export const searchFavorites = (user, req) => {
    // declare api key
    // const apiKey = env.API_KEY
    // declare base of url to be referenced later
    // const searchUrl = 'https://api.spoonacular.com/favorites/complexSearch?query='
    // set terms for axios
    console.log('this is user in favorites.js', user)
    const config = {
        method: 'GET',
        url: `${apiUrl}/users`,
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {user:user._id}
    }
    console.log('this is config.data in favorites.js', config.data)
    return axios(config)
}

// Show Function -> GETs favorites information from local host
export const showFavorites = (favoriteId) => {

    // const apiKey = env.API_KEY
    // const searchUrl = `https://api.spoonacular.com/favorites/${spoonId}/information?includeNutrition=false&apiKey=${apiKey}`
    
    const config = {
        method: 'get',
        url: `${apiUrl}/favorites/${favoriteId}`
    }
    return axios(config)
}


