import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { searchFavorites, createFavorites } from '../../api/favorites'



// styling object for favorite cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const Favorites = (props) => {
    // retrieves object data from FavoritesSearch
    const { state } = useLocation()
    const [results,setResults] = useState(null)
    const { favorites, msgAlert} = props
    console.log('this is favorites', favorites)

    useEffect(() => {
        searchFavorites()
            .then(res => {
                setResults(res.data.results)
                console.log('apiresponse',results)

            })
            .then(() =>
                msgAlert({
                    heading: 'Success!',
                    message: `Search Results for ${state.query.favorites}`,
                    variant: 'success',
                }))
            .catch(()=> {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Issue with search result',
                    variant: 'danger',
                })})
    }, [])




    if (!results) {
        return <p>loading...</p>
    } else if (results.length === 0) {
        return <p>No favorites found</p>
    }

    let favoritesCards

    if (results.length > 0) {
        
        favoritesCards = results.map(result => (
            <Card 
            border = "light" 
            key={result.id} 
            style={{ width: '20%', 
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            fontFamily: "Times New Roman", 
            backgroundColor: "rgb(255,255,230)"}} 
            className="m-2">
                <Card.Img 
                style = {{rounded : true}} 
                border = "dark"
                variant = 'top' 
                src ={ `${result.image}`}/>
                <Card.Body>
                <Card.Title style={{textAlign : "center"}}>{result.title}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <Card.Text>
                    <div className="d-grid gap-2">
                        <Button className = "formButton" style = {{backgroundColor: "rgb(83, 200, 70)" , border: "rgb(83, 200, 70)"}} size = "sm">
                        <Link style={{color : "black"}} to={`/favorites/${result.id}`}>View Favorites</Link>
                        </Button>
                     </div>   
                    </Card.Text>
                    </Card.Footer>
                
            </Card>
            
        ))
    }

    return (
        <>
            <h3 style={{textAlign : "center", fontFamily: "Times New Roman"}}> Showing results for: {state.query.favorites}</h3>
            <div style={cardContainerLayout}>
                {favoritesCards}
                
            </div>
        </>
    )
}

export default FavoritesIndex