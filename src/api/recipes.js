import apiUrl from '../apiConfig'
import axios from 'axios'



// Search Recipe Function -> GETs results from recipe query

export const searchRecipe = (query) => {
    const searchUrl = 'https://api.spoonacular.com/recipes/complexSearch?query='
    const apiKey = '4fc8dce57c754322bc1cbe1f57283bd6'

    const config = {
        method: 'get',
        url: `${searchUrl+query}&addRecipeInformation=true&number=10&apiKey=${apiKey}`
    }
    return axios(config)
}


// Show Function -> GETs recipe information 

// Price Function -> GETs recipe price breakdown for each ingredient


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


