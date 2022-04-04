import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link,useLocation } from 'react-router-dom'
import { searchRecipe } from '../../api/recipes'


// styling object for recipe cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const RecipeIndex = (props) => {
    // retrieves object data from RecipeSearch
    const { state } = useLocation()
    const [results,setResults] = useState(null)
    const { msgAlert} = props

    useEffect(() => {
        searchRecipe(state.query.recipe)
            .then(res => {
                setResults(res.data.results)
                console.log('apiresponse',results)

            })
            .then(() =>
                msgAlert({
                    heading: 'Success!',
                    message: `Search Results for ${state.query.recipe}`,
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
        return <p>No recipes found</p>
    }

    let recipeCards

    if (results.length > 0) {
        recipeCards = results.map(result => (
            <Card key={result.id} style={{ width: '30%' }} className="m-2">
                <Card.Header>{result.id}</Card.Header>
                <Card.Body>
                    {/* <Card.Text>
                        <Link to={}>View {}</Link>
                    </Card.Text> */}
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3> Search Results: {state.query.recipe}</h3>
            <div style={cardContainerLayout}>
                {recipeCards}
                
            </div>
        </>
    )
}

export default RecipeIndex


// AN EXAMPLE API RESPONSE FROM EXTERNAL API, DEVELOPMENT USE ONLY
// const ExampleResult = [
//     {
//         "vegetarian": true,
//         "vegan": false,
//         "glutenFree": false,
//         "dairyFree": false,
//         "veryHealthy": false,
//         "cheap": false,
//         "veryPopular": false,
//         "sustainable": false,
//         "weightWatcherSmartPoints": 17,
//         "gaps": "no",
//         "lowFodmap": false,
//         "aggregateLikes": 1,
//         "spoonacularScore": 75,
//         "healthScore": 35,
//         "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
//         "license": "CC BY 3.0",
//         "sourceName": "Foodista",
//         "pricePerServing": 279.01,
//         "id": 659015,
//         "title": "Salad With Apples, Gorgonzola and Walnuts",
//         "readyInMinutes": 45,
//         "servings": 4,
//         "sourceUrl": "http://www.foodista.com/recipe/2B5T467K/salad-with-apples-gorgonzola-and-walnuts",
//         "image": "https://spoonacular.com/recipeImages/659015-312x231.jpg",
//         "imageType": "jpg",
//         "summary": "Salad With Apples, Gorgonzolan and Walnuts is a <b>vegetarian</b> main course. One serving contains <b>536 calories</b>, <b>15g of protein</b>, and <b>42g of fat</b>. For <b>$2.37 per serving</b>, this recipe <b>covers 17%</b> of your daily requirements of vitamins and minerals. This recipe is liked by 1 foodies and cooks. Head to the store and pick up baguette, salt, creamy gorgonzola, and a few other things to make it today. To use up the pepper you could follow this main course with the <a href=\"https://spoonacular.com/recipes/dr-pepper-cake-with-flour-cooked-frosting-539165\">Dr. Pepper Cake with Flour Cooked Frosting</a> as a dessert. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 60%</b>. This score is solid. Try <a href=\"https://spoonacular.com/recipes/spring-salad-with-gorgonzola-and-walnuts-122928\">Spring Salad With Gorgonzolan and Walnuts</a>, <a href=\"https://spoonacular.com/recipes/endive-salad-with-walnuts-pears-and-gorgonzola-157059\">Endive Salad with Walnuts, Pears, and Gorgonzola</a>, and <a href=\"https://spoonacular.com/recipes/escarole-and-endive-salad-with-gorgonzola-and-walnuts-12833\">Escarole And Endive Salad With Gorgonzolan And Walnuts</a> for similar recipes.",
//         "cuisines": [],
//         "dishTypes": [
//             "salad"
//         ],
//         "diets": [
//             "lacto ovo vegetarian"
//         ],
//         "occasions": [],
//         "analyzedInstructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Cut the gorgonzola into pieces.Trim and thinly sliced apples, sprinkling the slices with lemon juice.",
//                         "ingredients": [
//                             {
//                                 "id": 9152,
//                                 "name": "lemon juice",
//                                 "localizedName": "lemon juice",
//                                 "image": "lemon-juice.jpg"
//                             },
//                             {
//                                 "id": 1011004,
//                                 "name": "gorgonzola",
//                                 "localizedName": "gorgonzola",
//                                 "image": "gorgonzola.jpg"
//                             },
//                             {
//                                 "id": 9003,
//                                 "name": "apple",
//                                 "localizedName": "apple",
//                                 "image": "apple.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 2,
//                         "step": "Cut the bread slices and toast in a skillet or the grill of the oven for 5 minutes until browned and crispy.Distribute the salad into 4 individual bowls or a large serving platter, arrange the bread and apples on the salad.",
//                         "ingredients": [
//                             {
//                                 "id": 9003,
//                                 "name": "apple",
//                                 "localizedName": "apple",
//                                 "image": "apple.jpg"
//                             },
//                             {
//                                 "id": 18064,
//                                 "name": "bread",
//                                 "localizedName": "bread",
//                                 "image": "white-bread.jpg"
//                             },
//                             {
//                                 "id": 18070,
//                                 "name": "toast",
//                                 "localizedName": "toast",
//                                 "image": "toast"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             },
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             },
//                             {
//                                 "id": 404706,
//                                 "name": "grill",
//                                 "localizedName": "grill",
//                                 "image": "grill.jpg"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ],
//                         "length": {
//                             "number": 5,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 3,
//                         "step": "Sprinkle with walnuts and gorgonzola.Emulsified oil and lemon juice a bowl.",
//                         "ingredients": [
//                             {
//                                 "id": 9152,
//                                 "name": "lemon juice",
//                                 "localizedName": "lemon juice",
//                                 "image": "lemon-juice.jpg"
//                             },
//                             {
//                                 "id": 1011004,
//                                 "name": "gorgonzola",
//                                 "localizedName": "gorgonzola",
//                                 "image": "gorgonzola.jpg"
//                             },
//                             {
//                                 "id": 12155,
//                                 "name": "walnuts",
//                                 "localizedName": "walnuts",
//                                 "image": "walnuts.jpg"
//                             },
//                             {
//                                 "id": 4582,
//                                 "name": "cooking oil",
//                                 "localizedName": "cooking oil",
//                                 "image": "vegetable-oil.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 4,
//                         "step": "Add salt and pepper and mix well.",
//                         "ingredients": [
//                             {
//                                 "id": 1102047,
//                                 "name": "salt and pepper",
//                                 "localizedName": "salt and pepper",
//                                 "image": "salt-and-pepper.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 5,
//                         "step": "Pour the seasoning to taste and serve salad.",
//                         "ingredients": [
//                             {
//                                 "id": 1042027,
//                                 "name": "seasoning",
//                                 "localizedName": "seasoning",
//                                 "image": "seasoning.png"
//                             }
//                         ],
//                         "equipment": []
//                     }
//                 ]
//             }
//         ],
//         "spoonacularSourceUrl": "https://spoonacular.com/salad-with-apples-gorgonzola-and-walnuts-659015"
//     },
//     {
//         "vegetarian": true,
//         "vegan": false,
//         "glutenFree": false,
//         "dairyFree": true,
//         "veryHealthy": false,
//         "cheap": false,
//         "veryPopular": false,
//         "sustainable": false,
//         "weightWatcherSmartPoints": 17,
//         "gaps": "no",
//         "lowFodmap": false,
//         "aggregateLikes": 1,
//         "spoonacularScore": 63,
//         "healthScore": 21,
//         "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
//         "license": "CC BY 3.0",
//         "sourceName": "Foodista",
//         "pricePerServing": 188.48,
//         "id": 1096010,
//         "title": "Egg Salad Wrap",
//         "readyInMinutes": 45,
//         "servings": 2,
//         "sourceUrl": "https://www.foodista.com/recipe/6RMF5QTL/egg-salad-wrap",
//         "image": "https://spoonacular.com/recipeImages/1096010-312x231.jpg",
//         "imageType": "jpg",
//         "summary": "Egg Salad Wrap takes about <b>45 minutes</b> from beginning to end. This dairy free and lacto ovo vegetarian recipe serves 2 and costs <b>$1.88 per serving</b>. This main course has <b>570 calories</b>, <b>26g of protein</b>, and <b>33g of fat</b> per serving. If you have mustard, vinegar, tortilla wraps, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. This recipe is liked by 1 foodies and cooks. With a spoonacular <b>score of 71%</b>, this dish is solid. <a href=\"https://spoonacular.com/recipes/avocado-egg-salad-wrap-549299\">Avocado Egg Salad Wrap</a>, <a href=\"https://spoonacular.com/recipes/egg-and-avocado-wrap-812204\">Egg and Avocado Wrap</a>, and <a href=\"https://spoonacular.com/recipes/scottish-egg-wrap-511365\">Scottish Egg Wrap</a> are very similar to this recipe.",
//         "cuisines": [],
//         "dishTypes": [
//             "side dish",
//             "lunch",
//             "main course",
//             "main dish",
//             "dinner"
//         ],
//         "diets": [
//             "dairy free",
//             "lacto ovo vegetarian"
//         ],
//         "occasions": [],
//         "analyzedInstructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Combine in a bowl the hardboiled eggs, red onions, parsley, dill, capers, mustard, vinegar, drizzle of olive oil, honey and seasonings.  Mash with a fork and toss.",
//                         "ingredients": [
//                             {
//                                 "id": 1129,
//                                 "name": "hard boiled egg",
//                                 "localizedName": "hard boiled egg",
//                                 "image": "hard-boiled-egg.png"
//                             },
//                             {
//                                 "id": 10011282,
//                                 "name": "red onion",
//                                 "localizedName": "red onion",
//                                 "image": "red-onion.png"
//                             },
//                             {
//                                 "id": 1042027,
//                                 "name": "seasoning",
//                                 "localizedName": "seasoning",
//                                 "image": "seasoning.png"
//                             },
//                             {
//                                 "id": 4053,
//                                 "name": "olive oil",
//                                 "localizedName": "olive oil",
//                                 "image": "olive-oil.jpg"
//                             },
//                             {
//                                 "id": 2046,
//                                 "name": "mustard",
//                                 "localizedName": "mustard",
//                                 "image": "regular-mustard.jpg"
//                             },
//                             {
//                                 "id": 11297,
//                                 "name": "parsley",
//                                 "localizedName": "parsley",
//                                 "image": "parsley.jpg"
//                             },
//                             {
//                                 "id": 2053,
//                                 "name": "vinegar",
//                                 "localizedName": "vinegar",
//                                 "image": "vinegar-(white).jpg"
//                             },
//                             {
//                                 "id": 2054,
//                                 "name": "capers",
//                                 "localizedName": "capers",
//                                 "image": "capers.jpg"
//                             },
//                             {
//                                 "id": 19296,
//                                 "name": "honey",
//                                 "localizedName": "honey",
//                                 "image": "honey.png"
//                             },
//                             {
//                                 "id": 2045,
//                                 "name": "dill",
//                                 "localizedName": "dill",
//                                 "image": "dill.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 2,
//                         "step": "Heat the wraps.",
//                         "ingredients": [
//                             {
//                                 "id": 10018364,
//                                 "name": "wrap",
//                                 "localizedName": "wrap",
//                                 "image": "flour-tortilla.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 3,
//                         "step": "Add the fresh lettuce, pickles and egg salad and roll tight.",
//                         "ingredients": [
//                             {
//                                 "id": 0,
//                                 "name": "egg salad",
//                                 "localizedName": "egg salad",
//                                 "image": ""
//                             },
//                             {
//                                 "id": 11252,
//                                 "name": "lettuce",
//                                 "localizedName": "lettuce",
//                                 "image": "iceberg-lettuce.jpg"
//                             },
//                             {
//                                 "id": 11937,
//                                 "name": "pickles",
//                                 "localizedName": "pickles",
//                                 "image": "dill-pickles.jpg"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "roll",
//                                 "localizedName": "roll",
//                                 "image": "dinner-yeast-rolls.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     }
//                 ]
//             }
//         ],
//         "spoonacularSourceUrl": "https://spoonacular.com/egg-salad-wrap-1096010"
//     }
// ]