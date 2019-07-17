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
		const tokensfromStorage = getFromStorage('tokens');
		if (tokensfromStorage) {
			const {
				accessToken,
				expiresIn,
				refreshToken,
			} = getFromStorage('tokens');

			const waitFetchAndDispatch = async () => {
				setIsLoading(true)
				const result = await fetchHomePage(accessToken)
				console.log(result)
				if (result.success) {
					console.log(true)
				} else {
					setError(result.message)
				}
				setIsLoading(false)
			}

			if (expiresIn > +new Date()) {
				console.log(1)
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
