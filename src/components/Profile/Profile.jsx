import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { refresh } from '../../services/token.service';
import { getFromStorage } from '../../utils/storage';
import { fetchData } from '../../services/user.service';
import UserContext from '../../store/dispatch';

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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
          if(result.tokenExpired)setRedirect(true);
        }
        const info = await fetchData(dispatch, accessToken);
        if (!info) return setRedirect(true);
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

      <h1>{state.login}</h1>
      <img alt='' src={state.photo} width="200" height="200" />
      <p><label>{state.name} {state.lastname}</label></p>
      <p><label>City: {state.city}</label></p>
      <p><label>Drinks: {state.drinks}</label></p>
      <Link to='/addinfo'>Edit profile</Link>
    </div>
  );
};

export default Profile;
