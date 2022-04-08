// import dependencies
import React, { useState, useEffect } from 'react'
import { Card, Button, Spinner } from 'react-bootstrap'
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
    // searching for grocery products
    useEffect(() => {
        searchGrocery(state.query.grocery)
            .then(res => {
                setResults(res.data.products)
                console.log('api response',products)
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
                })
            })
    }, [])




    if (!products) {
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
      </Spinner>
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
            fontFamily: "Times New Roman",
            backgroundColor: "rgb(255,255,230)" }} 
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
                        <Button style ={{marginTop: "2%", backgroundColor: "rgb(83, 200, 70)" , border: "rgb(83, 200, 70)"}} size = "sm">
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