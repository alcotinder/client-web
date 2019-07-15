import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getState } from '../../context';
import { getFromStorage } from '../../utils/storage';
import { protectedReq } from '../../helpers/apiHelper';
import { refresh } from '../../services/token.service';

const Home = () => {
	const { dispatch } = getState();
	const [isLoading, setIsLoading] = useState(false);

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
				const fetchData = async accessToken => {
					const result = await protectedReq(accessToken);

					if (result.success) {
						dispatch({ type: 'ADD_INFO', payload: result });
					}
				};
				fetchData(accessToken);
				setIsLoading(false);
			} else {
				refresh(refreshToken);
			}
		}

	}, []);
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
			<ul>
				<Link to='/addinfo'>Add info</Link>
			</ul>
		</div>
	);
};

export default Home;
