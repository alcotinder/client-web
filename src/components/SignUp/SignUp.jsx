import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signUpReq } from '../../helpers/apiHelper';

const SignUp = () => {
	const [redirect, setRedirect] = useState(false);
	const [login, setlogin] = useState('');
	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');
	const [confirmPassword, setconfirmPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async() => {
		setError('');
		if (password !== confirmPassword) return setError('Passwords dont match');
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
	};

	const redirectToSignIn = () => {
		setRedirect(true);
	};

	if (redirect) {
		return <Redirect to='/signin'/>;
	}

	return (
		<div>
			<form>
				<p>
					<label>Login</label>
					<input value={login} onChange={e => setlogin(e.target.value)}
						placeholder='Login' type='text' name='login' required/>
				</p>
				<p>
					<label>Email</label>
					<input value={email} onChange={e => setemail(e.target.value)}
						placeholder='Email' type='text' name='email' required/>
				</p>
				<p>
					<label>Password</label>
					<input value={password} onChange={e => setpassword(e.target.value)}
						placeholder='Password' type='text' name='password' required/>
				</p>
				<p>
					<label>Confirm password</label>
					<input value={confirmPassword} onChange={e => setconfirmPassword(e.target.value)}
						placeholder='Confirm password' type='text' name='confirmPassword' required/>
				</p>
			</form>
			<button onClick={handleSubmit}>
					Submit
			</button>
			<p><button onClick={redirectToSignIn}>Do you already have an account?</button></p>
			{	error ? error : null }
		</div>
	);
};

export default SignUp;
