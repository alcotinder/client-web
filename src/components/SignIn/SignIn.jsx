import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
  setInStorage,
} from '../../utils/storage';

import { signInReq } from '../../helpers/apiHelper';

import UserContext from '../../store/dispatch';

import connect from '../../helpers/socketHelper';

import useStyles from './style';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Collapse,
  CssBaseline,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const SignIn = () => {

  const { state, dispatch } = useContext(UserContext);

  const [login, setlogin] = useState('');
  const [password, setpassword] = useState('');

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const result = await signInReq(login, password);
    if (result.success) {
      const { accessToken, refreshToken, expiresIn } = result;
      setInStorage('tokens', {
        accessToken,
        refreshToken,
        expiresIn,
      });
      const socket = connect(accessToken);
      dispatch({ type: 'SOCKET', payload: socket });
      setRedirect(true);
    } else {
      setError(result.message);
    }
  };
  if (redirect) {
    return <Redirect to='/'/>;
  }

  return (
    <Container component='div' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Collapse in={!!error} variant='h5'>
          {error}
        </Collapse>
        <form className={classes.form} noValidate>
          <TextField
            label='Login'
            value={login}
            onChange={e => setlogin(e.target.value)}
            className={classes.textField}
            autoFocus
            fullWidth
            required
          />
          <TextField
            label='Password'
            type='password'
            value={password}
            onChange={e => setpassword(e.target.value)}
            className={classes.textField}
            fullWidth
            required
          />
          <Button
            onClick={handleSubmit}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/signup'>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;