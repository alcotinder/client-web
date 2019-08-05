import React, { useReducer, useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Header from '../Header/Header';
import Home from '../../scenes/Home/Home';
import Profile from '../Profile/Profile';
import AddInfo from '../AddInfo/AddInfo';
import User from '../User/User';
import NotFound from '../../scenes/NotFound/NotFound';

import io from 'socket.io-client';
import { getFromStorage } from '../../utils/storage';

import UserContext from '../../store/dispatch';
import infoReducer from '../../store/reducer';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const url = 'https://alcotinder.herokuapp.com';

const initialState = {
  login: '',
  name: '',
  lastname: '',
  city: '',
  drinks: '',
  photo: '',
  socket: {},
};

const Routes = () => {
  const [state, dispatch] = useReducer(infoReducer, initialState);

  useEffect(() => {
    if(getFromStorage('tokens')){
      const {
        accessToken,
        expiresIn
      } = getFromStorage('tokens');
      if(accessToken && +expiresIn > +Date.now()) {
        const socket = io.connect(url, {
          query: {
            authorization: `Bearer ${accessToken}`
          },
        });
        dispatch({ type: 'SOCKET', payload: socket });
      }
    }

  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <CssBaseline />
      <Switch>
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <>
          <Header />
          <Container xs={12}>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/addinfo' component={AddInfo} /> 
            <Route path='/users/:login' component={User} />
            {/* <Route path='*' component={NotFound} /> */}
          </Container>
        </>
      </Switch>
    </UserContext.Provider>
  );
};

export default Routes;
