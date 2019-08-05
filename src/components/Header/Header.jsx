import React, { useState, useEffect, useContext } from 'react';

import { Redirect, Link } from 'react-router-dom';
import { logOutToken } from '../../services/token.service';
import Logo from '../../Logo.png';

import UserContext from '../../store/dispatch';

import { 
  AppBar,
  Toolbar,
  Button,
  Typography,
  InputBase,
  Container,
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './style';

const Header = () => {

  const { state } = useContext(UserContext);

  const [search, setSearch] = useState('');
  const [login, setLogin] = useState('');
  const [redirect, setRedirect] = useState(false);

  const classes = useStyles();
  
  const flag = search === '';
  useEffect(() => {
    setRedirect(false);
  }, [flag]);

  const onKeyPress = keyCode => {
    if(keyCode === 13){
      setRedirect(true);
      setSearch('');
    }
  };

  const logOut = () => {
    if (!Object.keys(state.socket).length) state.socket.close();
  };

  return (
    <div className={classes.root}>
      { redirect && <Redirect to={`/users/${login}`} />}
      <AppBar position='static' color='inherit' >
        <Container className={classes.container} xs={12}>
          <Toolbar>
            <img alt='logo' src={Logo} />
            <Typography className={classes.title} variant='h5' noWrap>
            Alcotinder
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Search' }}
                value={search}
                onChange={e => { 
                  setSearch(e.target.value);
                  setLogin(e.target.value);
                }}
                onKeyUp={e => onKeyPress(e.keyCode)}
              />
            
            </div>
            <Button 
              className={classes.menu}
            ><Link className={classes.link} to='/profile'>
              Profile
              </Link>
            </Button>
            <Button 
              onClick={() => {logOutToken(); logOut(); }} 
              className={classes.menu}
            >
              <Link className={classes.link} to='/signin' >
                Logout
              </Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
    
  );
};

export default Header;