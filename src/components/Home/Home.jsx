import React, {  useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { getState } from '../../utils/context';
import { getFromStorage } from '../../utils/storage';
import { fetchData } from '../../helpers/apiHelper';
import { refresh } from '../../services/token.service';

const Home = () => {
	const { dispatch } = getState();
	const [isLoading, setIsLoading] = useState(false);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		const tokensfromStorage = getFromStorage('tokens');
		if (tokensfromStorage) {
			const {
				accessToken,
				expiresIn,
				refreshToken,
			} = getFromStorage('tokens');

			if (expiresIn > +new Date()) {
				setIsLoading(true);
				fetchData(accessToken);
				setIsLoading(false);
			} else {
				refresh(refreshToken);
			}
		} else {
			setRedirect(true)
		}

	}, []);

	if (redirect) {
		return <Redirect to='/signin'/>
	} 

	return (
		<div>
			{
				isLoading ?
				<p>Loading...</p> :
				null
			}
			<ul>
				<h1>Home</h1>
			</ul>
		</div>
	);
};

export default Home;
