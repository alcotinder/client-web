import React, { useState, useRef } from 'react';
import { addInfoReq, addPhotoReq } from '../../helpers/apiHelper';
import { getFromStorage } from '../../utils/storage';
import { refresh } from '../../services/token.service';
import getState from '../../services/state.service';

const AddInfo = () => {

	const { state, dispatch } = getState();
	const photo = useRef(null);

	const [name, setname] = useState(state.name);
	const [lastname, setlastname] = useState(state.lastname);
	const [city, setcity] = useState(state.city);
	const [drinks, setdrinks] = useState(state.drinks);
	const [error, setError]  = useState('');

	const uploadPhoto = async() => {
		const { accessToken, refreshToken, expiresIn } = getFromStorage('tokens');
		const formData = new FormData();
		formData.append('userAvatar', photo.current.files[0]);

		if (+expiresIn < new Date()) {
      const tokens = await refresh(refreshToken);
			if (!tokens.success) setError('Some error');
		}
		const result = await addPhotoReq(formData, accessToken);
    setError(result.message);
	};

	const updateInfo = async e => {
		e.preventDefault();
		const { accessToken, refreshToken, expiresIn } = getFromStorage('tokens');
		if (+expiresIn < new Date()) {
			const tokens = await refresh(refreshToken);
			if (!tokens.success) setError('Some error');
		}
		const userInfo = {
			name,
			lastname,
			city,
			drinks,
		};
    const result = await addInfoReq(userInfo, accessToken);
    setError(result.message);
	};

	return (
		<div>
			<h1>Add info page</h1>
			<p>{ error ? error : null }</p>
			<form>
				<p>
					<label>Your photo: </label>
					<input type="file" ref={photo} />
					<button onClick={uploadPhoto} >Upload photo</button>
				</p>
				<p>
					<label>Your firstname: </label>
					<input value={name} onChange={e => setname(e.target.value)}
						placeholder='First name' type='text' name='firstName'required/>
				</p>
				<p>
					<label>Your lastname: </label>
					<input value={lastname} onChange={e => setlastname(e.target.value)}
						placeholder='Last name' type='text' name='lastName'required/>
				</p>
				<p>
					<label>Your city: </label>
					<input value={city} onChange={e => setcity(e.target.value)}
						placeholder='City' type='text' name='city'required/>
				</p>
				<p>
					<label>Your favourite drink: </label>
					<input value={drinks} onChange={e => setdrinks(e.target.value)}
						placeholder='Favourite drink' type='text' name='drink'required/>
				</p>
			</form>
			<button onClick={updateInfo} >Update info</button>
		</div>
	);
};

export default AddInfo;
