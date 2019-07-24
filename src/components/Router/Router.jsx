import React, { useReducer } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import AddInfo from '../AddInfo/AddInfo';
import User from '../User/User';

import UserContext from '../../store/dispatch';
import infoReducer from '../../store/reducer';

import Container from '@material-ui/core/Container';

const initialState = {
  login: '',
  name: '',
  lastname: '',
  city: '',
  drinks: '',
  photo: '',
};

const Routes = () => {
  const [state, dispatch] = useReducer(infoReducer, initialState);

  return (
    <Switch>
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <UserContext.Provider value={{ state, dispatch }}>
        <Route component={Header}/>
        <Container xs={12}>
          <Route exact path='/' component={Home} />
          <Route path='/profile' component={Profile} />
          <Route path='/addinfo' component={AddInfo} /> 
          <Route path='/users/:login' component={User} />
        </Container>
      </UserContext.Provider>
    </Switch>
  );
};

export default Routes;
