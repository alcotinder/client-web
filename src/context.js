import React, { useContext } from 'react';

const UserContext = React.createContext('user');

const getState = () => useContext(UserContext);

export { UserContext, getState };


