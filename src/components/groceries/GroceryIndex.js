import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { searchGrocery } from '../../api/groceries'


// styling object for recipe cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const GroceryIndex = (props) => {
    // retrieves object data from RecipeSearch
    const { state } = useLocation()
    const [products,setResults] = useState(null)
    const { grocery, msgAlert} = props
    console.log('this is grocery', grocery)

    useEffect(() => {
        searchGrocery(state.query.grocery)
            .then(res => {
                setResults(res.data.products)
                console.log('apiresponse',products)

            })
            .then(() =>
                msgAlert({
                    heading: 'Success!',
                    message: `Search Results for ${state.query.grocery}`,
                    variant: 'success',
                }))
            .catch(()=> {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Issue with search result',
                    variant: 'danger',
                })})
    }, [])




    if (!products) {
        return <p>loading...</p>
    } else if (products.length === 0) {
        return <p>No grocery found</p>
    }

    let groceryCards

    if (products.length > 0) {
        
        groceryCards = products.map(product => (
            <Card 
            bg={"light"}
            border = "dark" 
            key={product.id} 
            style={{ width: '20%', 
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            fontFamily: "Times New Roman" }} 
            className="m-2">
                <Card.Img 
                style = {{rounded : true}} 
                border = "dark"
                variant = 'top' 
                src ={ `${product.image}`}/>
                <Card.Body>
                <Card.Title style={{textAlign : "center"}}>{product.title}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <Card.Text>
                    <div className="d-grid gap-2">
                        <Button variant ="primary" size = "sm">
                        <Link style={{color : "white"}} to={`/grocery/${product.id}`}>View Grocery</Link>
                        </Button>
                     </div>   
                    </Card.Text>
                    </Card.Footer>
                
            </Card>
            
        ))
    }

    return (
        <>
            <h3 style={{textAlign : "center", fontFamily: "Times New Roman"}}> Showing results for: {state.query.grocery}</h3>
            <div style={cardContainerLayout}>
                {groceryCards}
                
            </div>
        </>
    )
}

export default GroceryIndex