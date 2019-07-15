import React, { useState, useReducer, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';

import Header from '../Header/Header';
import Home from '../Home/Home';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import AddInfo from '../AddInfo/AddInfo';

import { UserContext } from '../../utils/context';
import { infoReducer } from '../../helpers/reducers';

const inititalState = {
	protected: '',
};

const App = () => {
	const [state, dispatch] = useReducer(infoReducer, inititalState);

	// useEffect(() => {
	// }, []);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<Router>
				<Header />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/profile' component={Profile} />
					<Route path='/signin' component={SignIn} />
					<Route path='/signup' component={SignUp} />
					<Route path='/addinfo' component={AddInfo} />
				</Switch>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
