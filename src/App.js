// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import RecipeSearch from './components/recipes/RecipeSearch'
import RecipeIndex from './components/recipes/RecipeIndex'
import CreateRecipe from './components/recipes/CreateRecipe'
import RecipeShow from './components/recipes/RecipeShow'
import Cart from './components/Cart'
import GrocerySearch from './components/groceries/GrocerySearch'
import GroceryIndex from './components/groceries/GroceryIndex'
import GroceryShow from './components/groceries/GroceryShow'

const App = () => {
	// destructure from useState
	const [user, setUser] = useState(null)
  	const [msgAlerts, setMsgAlerts] = useState([])
	// console logs for testing
  	console.log('user in app', user)
  	console.log('message alerts', msgAlerts)

  	const clearUser = () => {
    	console.log('clear user ran')
    	setUser(null)
  	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      		)
		})
	}

	return (
		<Fragment>
			<Header user={user}/>
			{/* all routes wrapped in Routes component */}
			<Routes>
				{/* home page route */}
				<Route 
					path='/' 
					element={
						<Home 
							msgAlert={msgAlert} 
							user={user}	
						/>
					}
				/>
				{/* sign up route */}
				<Route
					path='/sign-up'
					element={
						<SignUp 
							msgAlert={msgAlert} 
							setUser={setUser} 
						/>
					}
				/>
				{/* sign in route */}
				<Route
					path='/sign-in'
					element={
						<SignIn 
							msgAlert={msgAlert} 
							setUser={setUser} 
						/>
					}
				/>
				{/* sign out route */}
				<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
							<SignOut 
								msgAlert={msgAlert} 
								clearUser={clearUser} 
								user={user} 	
							/>
						</RequireAuth>
					}
				/>
				{/* change password route */}
				<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
							<ChangePassword 
								msgAlert={msgAlert} 
								user={user} 
							/>
						</RequireAuth>
					}
				/>
				{/* recipe search route */}
		  		<Route
				  	path='/recipe'
					element={
						// commented out auth
						//<RequireAuth user={user}>
							<RecipeSearch 
								msgAlert={msgAlert} 
								user={user}
							/>
						//</RequireAuth>
					}
				/>
				{/* recipe results route */}
				<Route
				  	path='/recipe/results'
					element={
						// commented out auth
						//<RequireAuth user={user}>
							<RecipeIndex 
								msgAlert={msgAlert} 
								user={user}	
							/>
						//</RequireAuth>
					}
				/>
				{/* route to create new recipe */}
				<Route
				  	path='/recipe/new'
					element={
						// commented out auth
						<RequireAuth user={user}>
							<CreateRecipe 
								msgAlert={msgAlert} 
								user={user}	
							/>
						</RequireAuth>
					}
				/>
				{/* recipe show route */}
				<Route
					path='/recipe/:id'
					element={
						//commented out auth
						//<RequireAuth user={user}>
							<RecipeShow msgAlert={msgAlert} user={user} />
						//</RequireAuth>
					}
				/>
				{/* cart view route */}
				<Route 
					path='/cart/view'
					element={
						<Cart 
							msgAlert={msgAlert} 
							user={user}	
						/>
					}
				/>
				{/* grocery search route */}
				<Route 
					path='/grocery'
					element={
						<GrocerySearch 
							msgAlert={msgAlert} 
							user={user}	
						/>
					}
				/>
				{/* grocery results route */}
				<Route 
					path='/grocery/results'
					element={
						<GroceryIndex 
							msgAlert={msgAlert} 
							user={user}	
						/>
					}
				/>
				{/* grocery show route */}
				<Route
					path='/grocery/:id'
					element={
						<GroceryShow 
							msgAlert={msgAlert} 
							user={user}		
						/>
					}
				/>
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>
	)
}

export default App
