import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const SignUp = () => {
  const url = "";
  const [redirect, setRedirect] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setCongirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log(redirect)
    setRedirect(true);
    console.log(login, password, email);
    if (password === confirmPassword) {
      fetch(url , {
        method: 'POST',
        body: JSON.stringify({
          login,
          password,
          email
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
    } else {
      alert("Passwords dont match")
    }
  }
  if (redirect) {
    return <Redirect to="/"/>
  }

  return (
    <div>
      <p>
        <label>Login: </label>
        <input required
          onChange={({ target }) =>
            setLogin(target.value)
          }
          value={login}
        />
      </p>
      <p>
        <label>Email: </label>
        <input type="email" required
          onChange={({ target }) =>
            setEmail(target.value)
          }
          value={email}
        />
      </p>
      <p>
        <label>Password: </label>
        <input type="password" required
          onChange={({ target }) =>
            setPassword(target.value)
          }
          value={password}
        />
      </p>
      <p>
        <label>Confirm Password: </label>
        <input type="password" required
         onChange={
           ({target}) => 
           setCongirmPassword(target.value)
         }
         value={confirmPassword}
        />
      </p>
      <p>
      <button onClick={handleSubmit}>
        Submit
      </button>
      </p>
    </div>
  )
}

export default SignUp
