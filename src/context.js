import React, { useContext } from 'react'

const UserContext = React.createContext();

const getState = () => useContext(UserContext);

export {UserContext, getState}

