import React, {  useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { getState } from '../../utils/context';
import { getFromStorage } from '../../utils/storage';
import { fetchHomePage } from '../../helpers/apiHelper';
import { refresh } from '../../services/token.service';

const Home = () => {
	const { dispatch } = getState();
	const [isLoading, setIsLoading] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState('')

	useEffect(() => {
		const waitFetchAndDispatch = async () => {
			setIsLoading(true)
			const result = await fetchHomePage(accessToken)
			if (result.success) {
				dispatch({ type: `ADD_INFO`, payload: result });
			} else {
				setError(result.message)
			}
			setIsLoading(false)
		}

		const tokensfromStorage = getFromStorage('tokens');
		if (tokensfromStorage) {
			const {
				accessToken,
				expiresIn,
				refreshToken,
			} = getFromStorage('tokens');

			if (expiresIn > +new Date()) {
				waitFetchAndDispatch()
			} else {
				refresh(refreshToken);
			}
		} else {
			setRedirect(true);
		}

	}, []);

	if (redirect) {
		return <Redirect to='/signin'/>;
	} 

	return (
		<div>
			{
				isLoading ?
					<p>Loading...</p> :
					null
			}
			{
				error ? 
				error :
				null
			}
			<ul>
				<h1>Home</h1>
			</ul>
		</div>
	);
};

export default Home;
