import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom';
import { useInput } from '../../helpers/customHooks'
import { addInfo } from '../../helpers/apiHelper'


const AddInfo = () => {
    const photo = useRef(null)
    const { value:name, bind:bindName } = useInput('');
    const { value:lastName, bind:bindLastName } = useInput('');
    const { value:city, bind:bindCity } = useInput('');
    const { value:favouriteDrink, bind:bindFavouriteDrink } = useInput('');

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('photo', photo.current.files[0], photo.current.files[0].name);
        formData.append('info', JSON.stringify({name, lastName, city, favouriteDrink}))
        const result = await addInfo(formData)
        console.log(result)     
        // Add info with dispatch to global state   
        if (result.success) return <Redirect to='/signin'/>
    }

    return (
        <div>
        <h1>
            AddInfoPage
        </h1>
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
        <input {...bindFavouriteDrink}/>
        </p>
        <button onClick={handleSubmit} >Submit</button>
        </div>
    )
}

export default AddInfo