import React, { useState } from 'react'

const SignIn = () => {
  const [login, setlogin] = useState('');
  const [password, setpassword] = useState('');

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
    .then(res => console.log(JSON.stringify(res)))
    .catch(e => console.error('Error:', e));
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