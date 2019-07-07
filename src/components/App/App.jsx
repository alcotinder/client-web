import React, { useState } from 'react'
import { 
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

function Index() {
  return <h2>Home</h2>;
}

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

function SignUp() {
  return <h2>SignUp</h2>;
}

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signin/">Sign in</Link>
            </li>
            <li>
              <Link to="/signup/">Sign up</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/signin/" exact component={SignIn} />
        <Route path="/signup/" exact component={SignUp} />
      </div>
    </Router>
  );
}

export default App;
