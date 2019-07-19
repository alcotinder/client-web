import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import getState from '../../services/state.service';
import { refresh } from '../../services/token.service';
import { getFromStorage } from '../../utils/storage';
import { fetchData } from '../../services/user.service';

const Profile = props => {
  const { state, dispatch } = getState();

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    props.updateOnlineStatus(true);
    const tokensfromStorage = getFromStorage('tokens');
    if (tokensfromStorage) {
      const {
        accessToken,
        expiresIn,
        refreshToken,
      } = getFromStorage('tokens');

      const updateData = (async() => {
        setIsLoading(true);
        if (expiresIn < +new Date()) {
          const result = await refresh(refreshToken);
          result.tokenExpired ? setRedirect(true) : null;
        }
        const info = await fetchData(dispatch, accessToken);
        if (!info) return setRedirect(true);
        props.updateInfo(info);
        
        setIsLoading(false);
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

      <h1>Your profile</h1>
      <img src={state.photo} width="200" height="200" />
      <p><label>Name: {state.name}</label></p>
      <p><label>Last name: {state.lastname}</label></p>
      <p><label>City: {state.city}</label></p>
      <p><label>Drinks: {state.drinks}</label></p>
      <Link to='/addinfo'>Edit profile</Link>

    </div>
  );
};

export default Profile;
