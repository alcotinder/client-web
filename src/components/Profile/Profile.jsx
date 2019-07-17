import React, { useEffect, useLayoutEffect, useContext, useState, useRef } from 'react';
import { getFromStorage } from '../../utils/storage';
import { useInput } from '../../helpers/customHooks'
import { 
	getInfoReq, 
	getPhotoReq, 
	addInfoReq, 
	addPhotoReq
} from '../../helpers/apiHelper'
import { getState } from '../../utils/context';

const Profile = () => {
	const { accessToken, expiresIn, refreshToken } = getFromStorage('tokens');
	const { state, dispatch} = getState();
	const photo = useRef(null);
	const [infoSaved, setInfoSaved] = useState('')
	const [photoSaved, setPhotoSaved] = useState('')
	
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchInfoAndPhoto = async () => {
			setIsLoading(true)
			const results = await Promise.all([
				getInfoReq(accessToken, state.login),
				getPhotoReq(state.login)
			])
			dispatch({type: 'ADD_INFO', payload: results[0].bio})
			const photoUrl = URL.createObjectURL(results[1])
			dispatch({type: 'ADD_PHOTO', payload: photoUrl})
			setIsLoading(false)
		}
		fetchInfoAndPhoto()		
	}, [])
	
	const nowName = state.name;
	const { value: name, bind:bindName } = useInput(state.name);
	const { value: lastname, bind:bindLastName } = useInput(state.lastname);
	const { value: city, bind:bindCity } = useInput(state.city);
	const { value: drinks, bind:bindDrinks } = useInput(state.drinks);
	const [error, setError] = useState('')
	const [editing, setEditing] = useState(false)

	const saveInfoChanges = async () => {
		dispatch({type:'EDIT_INFO', payload:{name, lastname, city, drinks}})
		console.log(state)
		try {
			const result = await addInfoReq({name, lastname, city, drinks},accessToken)
			if (result.success) {
				setEditing(false)
				setInfoSaved('Saved successfully')
			} else {
				setError('Some error')
			}
		} catch (error) {
			setError('Some error')
		}
	}

	const saveNewAvatar = async () => {
		const formData = new FormData();
		formData.append('userAvatar', photo.current.files[0]);
		try {
			const result = await addPhotoReq(formData, accessToken)	
			console.log(result)
			if (result.success) {
				setPhotoSaved('Saved successfully')
			}  else {
				setError('Some error')
			}
		} catch (error) {
			setError('Some Error')
		}
	}


	if (isLoading) {
		return (
			<div>
				<h1>
					Is Loading
				</h1>
			</div>
		)
	} else {
		if (editing) {
			return (
				<div>
					<h1>
						Editing
					</h1>
					<p>
						{
							photoSaved ?
							photoSaved :
							null
						}
					</p>
					<p>
						<label>photo</label>
						<input type="file" ref={photo} />
					</p>
					<p>
						<button onClick={saveNewAvatar}>Save new Avatar</button>
					</p>
					<p>
						<label>Name</label>
						<input {...bindName} value={name}/>
					</p>
					<p>
						<label>Last Name</label>
						<input {...bindLastName} value={lastname}/>
					</p>
					<p>
						<label>City</label>
						<input {...bindCity} value={city}/>
					</p>
					<p>
						<label>Drinks</label>
						<input {...bindDrinks} value={drinks}/>
					</p>
					<button onClick={saveInfoChanges}>
						Save changes
					</button>
				</div>
			)
		 } else {
			return (
				<div>
					<h1>
						Not Editing
					</h1>
					<p>
						<label>
							Photo: 
						</label>
						<img src={state.photo} width="200" height="200" />
					</p>
					<p>
						<label>
							Name: 
						</label>
						{
							state.name
						}
					</p>
					<p>
						<label>
							Last Name: 
						</label>
						{
							state.lastname
						}
					</p>
					<p>
						<label>
							City: 
						</label>
						{
							state.city
						}
					</p>
					<p>
						<label>
							Drinks: 
						</label>
						{
							state.drinks
						}
					</p>
					<p>
						{
							infoSaved ?
							infoSaved :
							null
						}
					</p>
					<button onClick={() => setEditing(true)}>Edit Profile</button>
				</div>
		
			);
		 }
	}
};

export default Profile;
