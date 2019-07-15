import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
	setInStorage,
} from '../../utils/storage';

import { signInReq } from '../../helpers/apiHelper';
import { useInput } from '../../helpers/customHooks'

const SignIn = () => {
	const { value:login, bind:bindLogin } = useInput('');
    const { value:password, bind:bindPassword } = useInput('');
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState('');

	const handleButtonClick = async() => {
		try {
			const result = await signInReq(login, password);
			if (result.success) {
				const { accessToken, refreshToken, expiresIn } = result;
				setInStorage('tokens', {
					accessToken,
					refreshToken,
					expiresIn,
				});
				setRedirect(true);
			} else {
				setError(result.message);
			}
		} catch (error) {
			setError('Some error');
		}
	};
	if (redirect) {
		return <Redirect to='/profile'/>;
	}

	return (
		<div>
			<p>
				<label>Login: </label>
				<input {...bindLogin} />
			</p>
			<p>
				<label>Password: </label>
				<input type='password' {...bindPassword} />
			</p>
			<p>
				{
					error ?
						error :
						null
				}
			</p>
			<p>
				<button onClick={handleButtonClick}>
					Submit
				</button>
			</p>
		</div>
	);
};

export default SignIn;
