import React from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../../services/token.service';

const Header = () => {
	
	return (
		<div>
			<ul>
				<li><Link to="/profile">Profile</Link></li>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/signin'>Sign In</Link></li>
				<li><Link to='/signup'>Sign Up</Link></li>
				<li><a href='/' onClick={logOut}>Logout</a></li>
			</ul>
		</div>
	);
};

export default Header;
