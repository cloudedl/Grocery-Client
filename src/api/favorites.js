import apiUrl from '../apiConfig'
import axios from 'axios'
import env from "react-dotenv"

// Search Favorites Function -> GETs query results from localhost
export const searchFavorites = () => {
    // declare api key
    // const apiKey = env.API_KEY
    // declare base of url to be referenced later
    // const searchUrl = 'https://api.spoonacular.com/favorites/complexSearch?query='
    
    // set terms for axios
    const config = {
        method: 'get',
        url: `${apiUrl}/favorites`
    }
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

// POST -> create function
export const createFavorites = (user, newFavorites) => {
    // console.log('user', user)
    console.log('this is newFavorites', newFavorites)
    return axios({
        url: `${apiUrl}/favorites`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { favorites: newFavorites }
    })
}

