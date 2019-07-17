import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useInput } from '../../helpers/customHooks';
import { addInfoReq, addPhotoReq } from '../../helpers/apiHelper';
import { validateInfo } from '../../helpers/validation'
import { getFromStorage } from '../../utils/storage'


const AddInfo = () => {
	const photo = useRef(null);
	const { value:name, bind:bindName } = useInput('');
	const { value:lastname, bind:bindLastName } = useInput('');
	const { value:city, bind:bindCity } = useInput('');
	const { value:drinks, bind:bindDrinks } = useInput('');
	const [error, setError]  = useState('')
	const [redirect, setRedirect] = useState(false)
	const [flag, setFlag] = useState(true);

	const handleSubmit = async () => {
		const {
			accessToken
		} = getFromStorage('tokens');
		const formData = new FormData();
		formData.append('userAvatar', photo.current.files[0]);
		const userInfo = {name, lastname, city, drinks}
		if (validateInfo(userInfo)) {
			const results = await Promise.all([
				addInfoReq(userInfo, accessToken),
				addPhotoReq(formData, accessToken)	
			])
			results.forEach(result => {
				if (!result.success) {
					setFlag(false)
					setError(result.message)
				}
			})
			setRedirect(true)
		} else {
			setError('Invalid Input')
		}
	};

	if (redirect && flag) {
		return (
		<div>
		<Redirect to='/signin'/>
		<p>
			{
				error ?
				error :
				null
			}
		</p>
		</div>
		)
	}

	return (
		<div>
			<h1>
            AddInfoPage
			</h1>
			<p>
				{
					error ?
					error :
					null
				}
			</p>
			<p>
				<label>Your name: </label>
				<input {...bindName}/>
			</p>
			<p>
				<label>Your Last Name: </label>
				<input {...bindLastName}/>
			</p>
			<label>Your photo: </label>
			<input type="file" ref={photo} />
			<p>
				<label>Your city: </label>
				<input {...bindCity}/>
			</p>
			<p>
				<label>Your favourite drink: </label>
				<input {...bindDrinks}/>
			</p>
			<button onClick={handleSubmit} >Submit</button>
		</div>
	);
};

export default AddInfo;