import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getState } from '../../context';
import {
	setInStorage,
} from '../../utils/storage';

import { signInReq } from '../../helpers/apiHelper';

const SignIn = () => {
	const [login, setlogin] = useState('');
	const [password, setpassword] = useState('');
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState('');

	const { dispatch } = getState();

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
				dispatch({ type: 'LOG_IN', payload: result });
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
				<input
					onChange={({ target }) =>
						setlogin(target.value)
					}
					value={login}
				/>
			</p>
			<p>
				<label>Password: </label>
				<input
					onChange={({ target }) =>
						setpassword(target.value)
					}
					value={password}
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
				<button onClick={handleButtonClick}>
					Submit
				</button>
			</p>
		</div>
	);
};

export default SignIn;
