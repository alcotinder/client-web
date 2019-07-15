import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { signUpReq } from '../../helpers/apiHelper';

const SignUp = () => {
	const [redirect, setRedirect] = useState(false);
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setCongirmPassword] = useState('');
	const [email, setEmail] = useState('');
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
				<input required
					onChange={({ target }) =>
						setLogin(target.value)
					}
					value={login}
				/>
			</p>
			<p>
				<label>Email: </label>
				<input type='email' required
					onChange={({ target }) =>
						setEmail(target.value)
					}
					value={email}
				/>
			</p>
			<p>
				<label>Password: </label>
				<input type='password' required
					onChange={({ target }) =>
						setPassword(target.value)
					}
					value={password}
				/>
			</p>
			<p>
				<label>Confirm Password: </label>
				<input type='password' required
					onChange={
						({ target }) =>
							setCongirmPassword(target.value)
					}
					value={confirmPassword}
				/>
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
