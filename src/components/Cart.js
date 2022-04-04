import React, { useState, useEffect } from 'react'

export default function Cart(props) {
    // example array
    const cartItemsArray = [
        {
            name: 'tomato',
            price: 1.00
        },
        {
            name: 'banana',
            price: 0.50
        },
        {
            name: 'potato',
            price: 2.00
        }
    ]

    const cartItemsDisplay = cartItemsArray.map(item => {
        return (
            <h4>{item.name} {item.price}</h4>
        )
    })

    const cartTotal = cartItemsArray.reduce((a, b) => {
        return (
            {price: a.price + b.price}
        )
    })

    return (
        <>
            <div>
                <header>
                    <h2>Cart</h2>
                </header>
                <div>
                    {cartItemsDisplay}
                    {cartTotal.price}
                </div>
            </div>
        </>
    )
}