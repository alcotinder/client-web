import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import getState from '../../services/state.service';
import { refresh } from '../../services/token.service';
import { getFromStorage } from '../../utils/storage';
import { getUserAvatar, getUserInfo } from '../../helpers/apiHelper';

const Profile = () => {
	const { state, dispatch } = getState();
	
	const [name, setname] = useState('');
	const [lastname, setlastname] = useState('');
	const [city, setcity] = useState('');
	const [drinks, setdrinks] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState('');
	
	useEffect(() => {
		const tokensfromStorage = getFromStorage('tokens');
		if (tokensfromStorage) {
			const {
				accessToken,
				expiresIn,
				refreshToken,
			} = getFromStorage('tokens');

			const fetchData = async() => {
				setIsLoading(true);
				const result = await getUserInfo(accessToken);
				if (result.success) {
					const {
						name,
						lastname,
						drinks,
						city,
					} = result.bio;

					setname(name);
					setlastname(lastname);
					setcity(city);
					setdrinks(drinks);
					dispatch({ type: 'ADD_INFO', payload: result.bio });
				}
				setIsLoading(false);
			};
			
			const updateData = (async() => {
				if (expiresIn < +new Date()) {
					await refresh(refreshToken);
				}
				await fetchData();
			})();


		} else {
			setRedirect(true);
		}

	}, []);

	if (redirect) return <Redirect to='/signin'/>;

	if (isLoading) return <div> Loading... </div>;

	return (
		<div>
			{ error ? error : null }

			<h1>Home</h1>

			<p><label>Name: {name}</label></p>
			<p><label>Last name: {lastname}</label></p>
			<p><label>City: {city}</label></p>
			<p><label>Drinks: {drinks}</label></p>

		</div>
	);
};

export default Profile;
