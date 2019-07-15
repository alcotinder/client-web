const { stringify } = JSON;

const API_URL = 'http://localhost:8000';

const signInReq = async(login, password) => {
	const endpoint = '/signin';
	const url = `${API_URL}${endpoint}`;
	const result = await fetch(url, {
		method: 'POST',
		body: stringify({
			login,
			password,
		}),
		headers: {
			'Content-type': 'application/json',
		},
	});
	const body = await result.json();
	return body;
};

const signUpReq = async(email, login, password, confirmPassword) => {
	const endpoint = '/signup';
	const url = `${API_URL}${endpoint}`;
	const result = await fetch(url, {
		method: 'POST',
		body: stringify({
			login,
			password,
			email,
			confirmPassword,
		}),
		headers: {
			'Content-type': 'application/json',
		},
	});
	const body = await result.json();
	return body;
};

const refreshTokensReq = async refreshToken => {
	const endpoint = '/api/auth/refresh-token';
	const url = `${API_URL}${endpoint}`;
	const result = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${refreshToken}`,
		},
	});
	const body = await result.json();
	return body;
};

const protectedReq = async accessToken => {
	const endpoint = '/protected';
	const url = `${API_URL}${endpoint}`;
	const result = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		},
	});
	const body = await result.json();
	return body;
};


export {
	signInReq,
	signUpReq,
	refreshTokensReq,
	protectedReq,
};
