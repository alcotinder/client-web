import React, { useReducer } from 'react';
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

import UserContext from '../../store/dispatch';
import infoReducer from '../../store/reducer';

const inititalState = {
	login: '',
	name: '',
	lastname: '',
	city: '',
	drinks: '',
	photo: null,
};

const App = () => {
	const [state, dispatch] = useReducer(infoReducer, inititalState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<Router>
				<Header />
				<Switch>
					<Route path='/' exact render={() => <Home value={{ state }}/>} />
					<Route path='/signin' component={SignIn} />
					<Route path='/signup' component={SignUp} />
					<Route path='/profile' component={Profile} />
					<Route path='/addinfo' component={AddInfo} />
				</Switch>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
