import React from 'react';
import { getFromStorage } from '../../utils/storage';

const Profile = () => {
	const { accessToken, expiresIn } = getFromStorage('tokens');
	return (
		<div>
			<p>
				{
					accessToken && +expiresIn > Date.now() ?
						'Online' :
						'Offline'
				}
			</p>
		</div>

	);
};

export default Profile;
