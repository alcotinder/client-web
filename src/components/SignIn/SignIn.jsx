import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
  setInStorage,
} from '../../utils/storage';

import { signInReq } from '../../helpers/apiHelper';
import UserContext from '../../store/dispatch';

const SignIn = () => {
  const getState = () => useContext(UserContext);
  const { state, dispatch } = getState();

  const [login, setlogin] = useState('');
  const [password, setpassword] = useState('');

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async() => {
    setError('');
    const result = await signInReq(login, password);
    if (result.success) {
      const { accessToken, refreshToken, expiresIn } = result;
      setInStorage('tokens', {
        accessToken,
        refreshToken,
        expiresIn,
      });
      dispatch({ type: 'ADD_LOGIN', payload: login });
      setRedirect(true);
    } else {
      setError(result.message);
    }
  };
  if (redirect) {
    return <Redirect to='/'/>;
  }

  return (
    <div>
      <form>
        <p>
          <label>Login</label>
          <input value={login} onChange={e => setlogin(e.target.value)}
            placeholder='login' type='text' name='login' required/>
        </p>
        <p>
          <label>Password</label>
          <input value={password} onChange={e => setpassword(e.target.value)}
            placeholder='password' type='text' name='password' required/>
        </p>
      </form>
      <button onClick={handleSubmit}>
					Submit
      </button>
      {
        error ? error : null
      }
    </div>
  );
};

export default SignIn;
