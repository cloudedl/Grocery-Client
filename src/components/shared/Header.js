import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import "./styles.css"
const linkStyle = {
    color: "black",
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Nav.Link>
			<Link to={`/grocery`} style={linkStyle}>Search groceries</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to={`/cart/view`} style={linkStyle}>View cart</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to={`/cart/checkout`} style={linkStyle}>Checkout</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Link>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Link>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Link>
        <Nav.Link>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Link>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Link>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Link>

<Nav.Link>
	<Link to='/recipe' style={linkStyle}>
		Recipe Search 
	</Link>
</Nav.Link>
<Nav.Link>
	<Link to='/recipe/new' style={linkStyle}>
		Create Recipe
	</Link>
</Nav.Link>
</>
)

const Header = ({ user }) => (
	<Navbar 
	style = {{
	backgroundColor : "rgb(83, 200, 70)"
	}}
	 variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' style={linkStyle}>
                NutriCart
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
