import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { refresh } from '../../services/token.service';
import { getFromStorage } from '../../utils/storage';
import { fetchData } from '../../services/user.service';
import UserContext from '../../store/dispatch';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    marginTop: 20,
    alignItems: 'center',
  },
});

// import {
//   Container,
//   Grid,
// } from '@material-ui/core';

const Profile = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const tokensfromStorage = getFromStorage('tokens');
    if (tokensfromStorage) {
      const {
        accessToken,
        expiresIn,
        refreshToken,
      } = getFromStorage('tokens');

      const updateData = (async() => {
        setIsLoading(true);
        if (expiresIn < +new Date()) {
          const result = await refresh(refreshToken);
          if(result.tokenExpired)setRedirect(true);
        }
        const info = await fetchData(dispatch, accessToken);
        if (!info) return setRedirect(true);
        setIsLoading(false);
      })();
    } else {
      setRedirect(true);
    }
  }, []);

  if (redirect) return <Redirect to='/signin'/>;

  if (isLoading) return <div> Loading... </div>;
  console.log(state);
  return (
  // <div>
  //   { error ? error : null }

  //   <h1>{state.login}</h1>
  //   <p><label>{state.name} {state.lastname}</label></p>
  //   <p><label>City: {state.city}</label></p>
  //   <p><label>Drinks: {state.drinks}</label></p>
      
  //   <Grid container spacing={3}>
  //     <Grid item xs={12} sm={6}>
  //       <img alt='' src={state.photo} width="200" height="200" />
  //       <Link to='/addinfo'>Edit profile</Link>
  //     </Grid>
  //     <Grid item xs={12} sm={6}>
  //       ываываываываыDSFSDFSDFва
  //     </Grid>
  //   </Grid>
  // </div>

    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="250"
          image={state.photo}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {state.login}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica
          </Typography>
          <Typography gutterBottom variant="h5" component="p">
            <label>{state.name} {state.lastname}</label>
            <label>City: {state.city}</label>
            <label>Drinks: {state.drinks}</label>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link to='/addinfo'>Edit profile</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Profile;
