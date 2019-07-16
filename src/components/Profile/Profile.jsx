import React, { useEffect, useContext, useState } from 'react';
import { getFromStorage } from '../../utils/storage';
import { 
	getInfoReq, 
	getPhotoReq, 
	addInfoReq, 
	addPhotoReq
} from '../../helpers/apiHelper'
import { getState } from '../../utils/context';

const Profile = () => {
	const { accessToken, expiresIn, refreshToken } = getFromStorage('tokens');
	const { state, dispatch} = getState()

	useEffect(() => {
						
	}, [])
	

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
