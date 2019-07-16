const { stringify } = JSON;

const API_URL = 'https://c3378224.ngrok.io';

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
		method: 'POST',
		body: formData,
		headers: {
			'Authorization': `Bearer ${accessToken}`,
			'Content-Type': 'multipart/form-data'
		},
	});
	const body = await result.json();
	return body;
};

const addInfoReq = async userInfo => {
	const endpoint ='';
	const url = `${API_URL}${endpoint}`;
	const result = await fetch(url, {
		method: 'POST',
		body: stringify(userInfo),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const body = await result.json();
	return body
}

const getPhotoReq = async (login) => {
	const endpoint ='';
	const url = new URL(`${API_URL}${endpoint}`)
	url.searchParams.append('login', login)
	const result = await fetch(url);
	console.log(result)
}

const getInfoReq = async (accessToken,login) => {
	const endpoint ='';
	const url = new URL(`${API_URL}${endpoint}`)
	url.searchParams.append('login', login)
	const result = await protectedReq(accessToken, url);
	return result;	
}

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
	const endpoint = ''
	const url = `${API_URL}${endpoint}`
	const result = await protectedReq(accessToken, url);
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
