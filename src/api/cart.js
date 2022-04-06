import apiUrl from '../apiConfig'
import axios from 'axios'




// POST -> add item to items array in cart

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

