
import React from 'react';
import { Redirect } from 'react-router-dom';

import { getFromStorage } from '../../utils/storage';

const Home = () => {
  const tokensfromStorage = getFromStorage('tokens');
  const {
    accessToken,
    refreshToken,
  } = tokensfromStorage;
  if (accessToken && refreshToken) {
    return <Redirect to='/profile'/>;
  } else {
    return <Redirect to='/signup'/>;
  }
};

export default Home;
