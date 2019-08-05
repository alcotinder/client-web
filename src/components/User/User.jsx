import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { getInfoReq, postMessage, getMessages } from '../../helpers/apiHelper';

import { getFromStorage } from '../../utils/storage';
import { refresh } from '../../services/token.service';

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
  const [messages, setmessages] = useState([]);

  const [isExist, setIsExist] = useState(false);

  if(state.socket.on && messages.length ) {
    state.socket.on('message', msg => setmessages([...messages, msg]));
  }

  useEffect(() => {
    const updateData = (async() => {
      const {
        accessToken,
        refreshToken,
        expiresIn,
      } = getFromStorage('tokens');

      setIsLoading(true);
      setError('');
      const info = await getInfoReq(login);
      if(info.success){
        const { 
          name,
          lastname, 
          city, 
          drinks, 
          photo
        } = info.bio;

        setIsExist(true);
        setname(name);
        setlastname(lastname);
        setcity(city);
        setdrinks(drinks);
        setphoto(photo);
        if (expiresIn < +new Date()) {
          await refresh(refreshToken);
        }
        const data = await getMessages(accessToken, login);
        setmessages(data);
      } else {
        setIsExist(false);
        setError(info.message);
      }
      setIsLoading(false);
    })();
  }, [login]);

  const sendMessage = async() => {
    const {
      accessToken,
      refreshToken,
      expiresIn,
    } = getFromStorage('tokens');
    const msg = {
      body: message,
      to: login,
    };
    if (expiresIn < +new Date()) {
      await refresh(refreshToken);
    }
    await postMessage(accessToken, msg);
    setmessage('');
  };

  if (isLoading) return <div> Loading... </div>;

  if(login === state.login) return <Redirect to='/profile'/>;
  return (
    <div>
      { error ? error : null }
      {
        isExist && 
        <>
        <div>
          <h1>Your AlcoFriend {login}</h1>
          <img alt='avatar' src={photo} width="200" height="200" />
          <p><label>{name} {lastname}</label></p>
          <p><label>City: {city}</label></p>
          <p><label>Drinks: {drinks}</label></p>
          <input type='text' value={message} onChange={e => setmessage(e.target.value)} />
          <button onClick={sendMessage}>Message</button>
        </div>
        <ul>
          {messages.length && messages.map((msg, index) => (
            <li
              key={index}
            >{msg.from} - {msg.body}</li>
          ))}
        </ul>
        </>
      }
    </div>
  );
};

export default User;
