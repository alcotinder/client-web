import React, { useState, useReducer } from 'react'
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from '../Header/Header';
import Home from '../Home/Home'
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/ProfilePage'


import {UserContext} from '../../context'
import {infoReducer} from '../../reducers'

const InititalState ={
  name: "",
  lastname: "",
}



function App () {
  
  const [state, dispatch] = useReducer(infoReducer, InititalState)

  return (
    <UserContext.Provider value={{state, dispatch}}>
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
