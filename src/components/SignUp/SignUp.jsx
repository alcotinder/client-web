import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { signUpReq } from '../../helpers/apiHelper';
import { useInput } from '../../helpers/customHooks'

const SignUp = () => {
	const [redirect, setRedirect] = useState(false);
	const { value:login, bind:bindLogin } = useInput('');
    const { value:password, bind:bindPassword } = useInput('');
    const { value:confirmPassword, bind:bindConfirmPassword } = useInput('');
    const { value:email, bind:bindEmail } = useInput('');
	const [error, setError] = useState('');

	const handleSubmit = async() => {
		if (password === confirmPassword) {
			try {
				const result = await signUpReq(email, login, password, confirmPassword);
				if (result.success) {
					setRedirect(true);
				} else {
					setError(result.message);
				}
			} catch (error) {
				setError('Some error');
			}
		} else {
			setError('Passwords dont match');
		}
	};
	if (redirect) {
		return <Redirect to='/signin'/>;
	}

	return (
		<div>
			<p>
				<label>Login: </label>
				<input required {...bindLogin}/>
			</p>
			<p>
				<label>Email: </label>
				<input required {...bindEmail}/>
			</p>
			<p>
				<label>Password: </label>
				<input required type='password' {...bindPassword}/>
			</p>
			<p>
				<label>Confirm Password: </label>
				<input required type='password' {...bindConfirmPassword}/>
			</p>
			<p>
				{
					error ?
					error : 
					null
				}
			</p>
			<p>
				<button onClick={handleSubmit}>
        Submit
				</button>
			</p>
		</div>
	);
};

export default SignUp;
