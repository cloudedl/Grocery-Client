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


// DELETE -> remove item from cart

export const removeItem = (user, itemId) => {
    console.log('user', user)
    console.log('this is itemId', itemId)
    return axios({
        url: `${apiUrl}/item/${itemId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
} 



// PATCH -> increase item quantity by one 

export const incItem = (user, itemId) => {
    console.log('user', user)
    console.log('this is itemId', itemId)
    return axios({
        url: `${apiUrl}/item/add/${itemId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
} 
