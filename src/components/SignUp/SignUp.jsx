import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import { signUpReq } from '../../helpers/apiHelper';

import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Collapse,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './style';

const SignUp = () => {

  const [redirect, setRedirect] = useState(false);
  const [login, setlogin] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) return setError('Passwords dont match');
    try {
      const result = await signUpReq(email, login, password, confirmPassword);
      if (result.success) {
        setRedirect(true);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Some error');
    }
  };

  if (redirect) return <Redirect to='/signin' />;

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Collapse in={!!error} variant='h5'>
          {error}
        </Collapse>
        <form className={classes.form} noValidate>
          <Grid spacing={0}>
            <Grid item xs={12}>
              <TextField
                label='Login'
                value={login}
                onChange={e => setlogin(e.target.value)}
                autoFocus
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Email Address'
                value={email}
                onChange={e => setemail(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Password'
                type='password'
                value={password}
                onChange={e => setpassword(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Confirm password'
                type='password'
                value={confirmPassword}
                onChange={e => setconfirmPassword(e.target.value)}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/signin'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
