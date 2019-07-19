import React, { useState, useRef, useEffect, useContext } from 'react';
import { addInfoReq, addPhotoReq } from '../../helpers/apiHelper';
import { getFromStorage } from '../../utils/storage';
import { refresh } from '../../services/token.service';
import { fetchData } from '../../services/user.service';
import UserContext from '../../store/dispatch';
import { Redirect } from 'react-router-dom';

const AddInfo = props => {
  const { state, dispatch } = useContext(UserContext);

  const photo = useRef(null);

  const [name, setname] = useState(state.name);
  const [lastname, setlastname] = useState(state.lastname);
  const [city, setcity] = useState(state.city);
  const [drinks, setdrinks] = useState(state.drinks);

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError]  = useState('');

  useEffect(() => {
    if (!state.login) {
      const tokensfromStorage = getFromStorage('tokens');
      if (tokensfromStorage) {
        const {
          accessToken,
          expiresIn,
          refreshToken,
        } = getFromStorage('tokens');

        const updateData = (async() => {
          setIsLoading(true);
          if (+expiresIn < +new Date()) {
            const result = await refresh(refreshToken);
            if(result.tokenExpired)setRedirect(true)
          }
          const info = await fetchData(dispatch, accessToken);
          if (!info) return setRedirect(true);
          props.updateOnlineStatus(true);
          props.updateInfo(info);
          setname(info.name);
          setlastname(info.lastname);
          setcity(info.city);
          setdrinks(info.drinks);
          setIsLoading(false);
        })();
      } else {
        setRedirect(true);
      }
    }
  }, []);

  const uploadPhoto = async e => {
    e.preventDefault();
    setError('');
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
    setError('');
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

  if (redirect) return <Redirect to='/signin'/>;

  if (isLoading) return <div> Loading... </div>;
  return (
    <div>
      <h1>Add info page</h1>
      <p>{ error ? error : null }</p>
      <form>
        <p>
          <label>Your photo: </label>
          <img alt='' src={state.photo} width="200" height="200" />
          <br />
          <input type='file' ref={photo} />
          <button onClick={uploadPhoto} >Upload photo</button>
        </p>
        <p>
          <label>Your firstname: </label>
          <input value={name} onChange={e => setname(e.target.value)}
            placeholder='First name' type='text' name='firstName'/>
        </p>
        <p>
          <label>Your lastname: </label>
          <input value={lastname} onChange={e => setlastname(e.target.value)}
            placeholder='Last name' type='text' name='lastName'/>
        </p>
        <p>
          <label>Your city: </label>
          <input value={city} onChange={e => setcity(e.target.value)}
            placeholder='City' type='text' name='city'/>
        </p>
        <p>
          <label>Your favourite drink: </label>
          <input value={drinks} onChange={e => setdrinks(e.target.value)}
            placeholder='Favourite drink' type='text' name='drink'/>
        </p>
      </form>
      <button onClick={updateInfo}>Update info</button>
    </div>
  );
};

export default AddInfo;
