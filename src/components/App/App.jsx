import React, { useState, useReducer, useEffect, Fragment } from 'react';
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

import { UserContext } from '../../store/context';
import { infoReducer } from '../../store/reducers';

const inititalState = {
	login: 'w',
	name: '',
    lastname: '',
    city: '',
	drinks: '',
	photo: null
};

const App = () => {
	const [state, dispatch] = useReducer(infoReducer, inititalState);

	// useEffect(() => {
	// }, []);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<Router>
				{/* */}
				<Switch>
					<Route path='/signin' component={SignIn} />
					<Route path='/signup' component={SignUp} />
					<Fragment>
						<Header /> 
						<Route path='/' exact component={Home} />
						<Route path='/profile' component={Profile} />
						<Route path='/addinfo' component={AddInfo} />
					</Fragment>
				</Switch>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
