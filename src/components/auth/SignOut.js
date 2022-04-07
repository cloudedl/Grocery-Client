import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup, Container} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
        <Container
    style={{ 
        marginTop: "10%",
        width: '30%', 
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        fontFamily: "Times New Roman" }} >
            <div className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h3>Confirm Sign Out</h3>
                    <ButtonGroup style={{padding: "2%"}} >
                        <Button variant='danger' onClick={onSignOut}>
                            Sign Out
                        </Button>
                        <Button variant='primary' onClick={onCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            </Container>
		</>
	)
}

export default SignOut
