import React from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../../services/token.service';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, CssBaseline, Container, IconButton, MenuIcon } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginLeft: '25%',
  },
}));

const Header = props => {
  const classes = useStyles();
  return (
    <Container component='div'>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="static" color="inherit" xs={12} sm={6}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" component='h1' variant='h5'>
              Alcotinder
            </IconButton>
            <ul>
              {
                props.online ?
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><a href='/' onClick={logOut}>Logout</a></li>
          </> :
                  null
              }
            </ul>
          </Toolbar>
        </AppBar>
      </div>

    </Container>
  );
};

export default Header;
