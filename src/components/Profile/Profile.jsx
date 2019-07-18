import React, { useEffect, useLayoutEffect, useContext, useState, useRef } from 'react';
import { getFromStorage } from '../../utils/storage';
import { useInput } from '../../helpers/customHooks'
import { 
	getInfoReq, 
	getPhotoReq, 
	addInfoReq, 
	addPhotoReq
} from '../../helpers/apiHelper'
import { getState } from '../../store/context';
import { checkValidtoken } from '../../services/token.service'

const Profile = () => {
	const { accessToken, expiresIn, refreshToken } = getFromStorage('tokens');
	const { state, dispatch} = getState();
	const photo = useRef(null);
	const [infoSaved, setInfoSaved] = useState('')
	const [photoSaved, setPhotoSaved] = useState('')
	
	const [isLoading, setIsLoading] = useState(true);
	useLayoutEffect(() => {
		checkValidtoken(expiresIn, refreshToken)
		const fetchInfoAndPhoto = async () => {
			const results = await Promise.all([
				getInfoReq(accessToken, state.login),
				getPhotoReq(state.login)
			])
			dispatch({type: 'ADD_INFO', payload: results[0].bio})

			setName(results[0].bio.name);
			setLastName(results[0].bio.lastname);	
			setCity(results[0].bio.city);
			setDrinks(results[0].bio.drinks);

			const photoUrl = URL.createObjectURL(results[1])
			dispatch({type: 'ADD_PHOTO', payload: photoUrl})
			setIsLoading(false)
		}
		fetchInfoAndPhoto()		
	}, [])
	
	const { value: name, bind:bindName, setValue: setName } = useInput('');
	const { value: lastname, bind:bindLastName, setValue: setLastName } = useInput('');
	const { value: city, bind:bindCity, setValue: setCity } = useInput('');
	const { value: drinks, bind:bindDrinks, setValue: setDrinks } = useInput('');
	const [error, setError] = useState('')
	const [editing, setEditing] = useState(false)

	const saveInfoChanges = async () => {
		try {
			const result = await addInfoReq({name, lastname, city, drinks},accessToken)
			if (result.success) {
				dispatch({type:'EDIT_INFO', payload:{name, lastname, city, drinks}})
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
				console.log(photo.current.files[0])
				dispatch({type: 'ADD_PHOTO', payload: photo.current.files[0]})
				setPhotoSaved('Saved successfully')
			}  else {
				setError('Some error1')
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
						{
							error ? 
							error :
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
