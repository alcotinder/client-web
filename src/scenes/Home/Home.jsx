
import React from 'react';
import { Redirect } from 'react-router-dom';

import { getFromStorage } from '../../utils/storage';

const Home = () => {
  if (getFromStorage('tokens')) {
    return <Redirect to='/profile'/>;
  } else {
    return <Redirect to='/signup'/>;
  }
};

export default Home;
