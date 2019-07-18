import React, { useContext } from 'react';
import UserContext from '../store/dispatch';

const getState = () => useContext(UserContext);
export default getState;

