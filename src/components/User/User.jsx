import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { getInfoReq, postMessage } from '../../helpers/apiHelper';

import { getFromStorage } from '../../utils/storage';

import UserContext from '../../store/dispatch';

const User = ({ match }) => {
  const { login } = match.params;
  const { state } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setname] = useState('');
  const [lastname, setlastname] = useState('');
  const [city, setcity] = useState('');
  const [drinks, setdrinks] = useState('');
  const [photo, setphoto] = useState('');
  const [message, setmessage] = useState('');

  const [isExist, setIsExist] = useState(false);

  // useEffect(() => {

  // }, [input])

  useEffect(() => {
    const updateData = (async() => {
      setIsLoading(true);
      setError('');
      const info = await getInfoReq(login);
      const { bio } = info;
      if(info.user){
        setIsExist(true);
      } else {
        setIsExist(false);
        setError(info.message);
      }
      setname(bio.name);
      setlastname(bio.lastname);
      setcity(bio.city);
      setdrinks(bio.drinks);
      setphoto(bio.photo);
        
      setIsLoading(false);
    })();
  }, [login]);

  const sendMessage = async() => {
    const {
      accessToken,
    } = getFromStorage('tokens');
    const msg = {
      message,
      to: login,
    };
    if (state.login > login) {
      msg.chatId = `${state.login}.${login}`;
    } else {
      msg.chatId = `${login}.${state.login}`;
    }
    await postMessage(accessToken, msg);
  };

  if (isLoading) return <div> Loading... </div>;

  if(login === state.login) return <Redirect to='/profile'/>;

  return (
    <div>
      { error ? error : null }
      {
        isExist && 
        <div>
          <h1>{login}</h1>
          <img alt='avatar' src={photo} width="200" height="200" />
          <p><label>{name} {lastname}</label></p>
          <p><label>City: {city}</label></p>
          <p><label>Drinks: {drinks}</label></p>
          <input type='text' value={message} onChange={e => setmessage(e.target.value)}></input>
          <button onClick={sendMessage}>Message</button>
        </div>
      }
    </div>
  );
};

export default User;
