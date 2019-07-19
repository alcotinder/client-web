import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
  setInStorage,
} from '../../utils/storage';

import { signInReq } from '../../helpers/apiHelper';
import UserContext from '../../store/dispatch';

import useStyles from './style';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Tooltip,
  Collapse,
  CssBaseline,
  Box,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const SignIn = () => {
  const getState = () => useContext(UserContext);
  const { state, dispatch } = getState();

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
      dispatch({ type: 'ADD_LOGIN', payload: login });
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
          <span>
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
          </span>
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

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Switch from '@material-ui/core/Switch';
// import Paper from '@material-ui/core/Paper';
// import Collapse from '@material-ui/core/Collapse';
// import FormControlLabel from '@material-ui/core/FormControlLabel';

// const useStyles = makeStyles(theme => ({
//   root: {
//     height: 180,
//   },
//   container: {
//     display: 'flex',
//   },
//   paper: {
//     margin: theme.spacing(1),
//   },
//   svg: {
//     width: 100,
//     height: 100,
//   },
//   polygon: {
//     fill: theme.palette.common.white,
//     stroke: theme.palette.divider,
//     strokeWidth: 1,
//   },
// }));

// export default function SimpleCollapse() {
//   const classes = useStyles();
//   const [checked, setChecked] = React.useState(false);

//   function handleChange() {
//     setChecked(prev => !prev);
//   }

//   return (
//     <div className={classes.root}>
//       <FormControlLabel
//         control={<Switch checked={checked} onChange={handleChange} />}
//         label="Show"
//       />
//       <div className={classes.container}>
//         <Collapse in={checked}>
//           <Paper elevation={4} className={classes.paper}>
//             <svg className={classes.svg}>
//               <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
//             </svg>
//           </Paper>
//         </Collapse>
//         <Collapse in={checked} collapsedHeight="40px">
//           <Paper elevation={4} className={classes.paper}>
//             <svg className={classes.svg}>
//               <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
//             </svg>
//           </Paper>
//         </Collapse>
//       </div>
//     </div>
//   );
// }
// <div>
//   <form>
//     <p>
//       <label>Login</label>
//       <input value={login} onChange={e => setlogin(e.target.value)}
//         placeholder='login' type='text' name='login' required/>
//     </p>
//     <p>
//       <label>Password</label>
//       <input value={password} onChange={e => setpassword(e.target.value)}
//         placeholder='password' type='text' name='password' required/>
//     </p>
//   </form>
//   <button onClick={handleSubmit}>
// 			Submit
//   </button>
//   {
//     error ? error : null
//   }
// </div>
