import React from 'react'
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from '../Header/Header';
import Home from '../Home/Home'
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';


function App () {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
