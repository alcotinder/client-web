import React, { useReducer, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from '../Header/Header';
import Home from '../Home/Home';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import AddInfo from '../AddInfo/AddInfo';

import UserContext from '../../store/dispatch';
import infoReducer from '../../store/reducer';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0, 0, 0),
    padding: theme.spacing(0, 0, 0),
    flexGrow: 1,
  },
}));

const initialState = {
  login: '',
  name: '',
  lastname: '',
  city: '',
  drinks: '',
  photo: '',
};

const App = () => {
  const classes = useStyles();
  const [online, setOnline] = useState(false);
  const [info, setInfo] = useState(initialState);
  const [state, dispatch] = useReducer(infoReducer, initialState);
  const updateOnlineStatus = value => {
    setOnline(value);
  };

  const updateInfo = value => {
    setInfo(value);
  };

  return (
    <UserContext.Provider value={{ state, dispatch }} className={classes.root}>
      <Router>

        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <>
            <Header online={online}/>
            <CssBaseline />
            <Container xs={12} sm={6} >
              <Route path='/' exact component={Home} />
              <Route path='/profile'
                render={() => <Profile
                  updateOnlineStatus={updateOnlineStatus}
                  updateInfo={updateInfo}
                /> }
              />
              <Route path='/addinfo'
                render={() => <AddInfo
                  updateOnlineStatus={updateOnlineStatus}
                  updateInfo={updateInfo}
                /> }
              />
            </Container>

          </>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
