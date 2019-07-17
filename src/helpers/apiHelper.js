const { stringify } = JSON;

const API_URL = 'https://da1708e3.ngrok.io';

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

const addPhotoReq = async (formData, accessToken) => {
	const endpoint = '/users/avatars/upload';
	const url = `${API_URL}${endpoint}`;
	const result = await fetch(url, {
		method: 'PUT',
		body: formData,
		headers: {
			'Authorization': `Bearer ${accessToken}`,
		},
	});
	const body = await result.json();
	return body;
};

const addInfoReq = async (userInfo, accessToken) => {
	const endpoint ='/users/bio';
	const url = `${API_URL}${endpoint}`;
	const result = await fetch(url, {
		method: 'PUT',
		body: stringify(userInfo),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		},
	});
	const body = await result.json();
	return body
}

const getPhotoReq = async login => {
	const endpoint ='/users/avatars/';
	const url = `${API_URL}${endpoint}${login}`
	const result = await fetch(url);
	const body = await result.blob()
	return body
}

const getInfoReq = async (accessToken, login) => {
	const endpoint ='/users/bio/';
	const url = `${API_URL}${endpoint}${login}`
	const result = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		},		
	})
	const body = await result.json()
	return body;	
}

const refreshTokensReq = async refreshToken => {
	const endpoint = '/api/auth/refresh-token';
	const url = `${API_URL}${endpoint}`;
	const result = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${refreshToken}`,
		},
	});
	const body = await result.json();
	return body;
};

const protectedReq = async (accessToken, url) => {
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

const fetchHomePage = async accessToken => {
	const endpoint = '/api/auth/refresh-token'
	const url = `${API_URL}${endpoint}`
	const result = await protectedReq(accessToken, 'https://da1708e3.ngrok.io/api/auth/refresh-token');
	return result;
};


export {
	signInReq,
	signUpReq,
	refreshTokensReq,
	protectedReq,
	addInfoReq,
	addPhotoReq,
	fetchHomePage,
	getInfoReq,
	getPhotoReq,
};
