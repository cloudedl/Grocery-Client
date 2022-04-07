import apiUrl from '../apiConfig'
import axios from 'axios'




// POST -> add item to itemsArray in cart

export const addItem = (user, newItem) => {
    console.log('user', user)
    console.log('this is newItem', newItem)
    return axios({
        url: `${apiUrl}/item/add`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {item:newItem}
    })
} 


// SHOW -> show items in cart

export const viewCart = (user) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/carts/view`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
} 


