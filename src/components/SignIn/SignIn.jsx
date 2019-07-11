import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const SignIn = () => {
  const [login, setlogin] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setRedirect] = useState(false)

  const handleButtonClick = () => {
    console.log(login, password);
    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        login,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(JSON.stringify(res))
      if (res) {
        setRedirect(true)
      }
    })
    .catch(e => console.error('Error:', e));
  }
  if (redirect) {
    return <Redirect to="/"/>
  }

  return (
    <div>
      <p>
        <label>Login: </label>
        <input
          onChange={({ target }) =>
            setlogin(target.value)
          }
          value={login}
        />
      </p>
      <p>
        <label>Password: </label>
        <input
          onChange={({ target }) =>
            setpassword(target.value)
          }
          value={password}
        />
      </p>
      <p>
      <button onClick={handleButtonClick}>
        Submit
      </button>
      </p>
    </div>
  );
}

export default SignIn;