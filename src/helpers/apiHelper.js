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

const addPhoto = async (formData, accessToken) => {
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

const addInfo = async userInfo => {
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

const protectedReq = async (accessToken, endpoint) => {
	const url = `https://9e477399-5048-4707-9c6a-69c29a777a22.mock.pstmn.io/home `;
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

const fetchData = async (accessToken, dispatch, type) => {
	const result = await protectedReq(accessToken);
	if (result.success) {
		dispatch({ type: `${type}`, payload: result.bio });
		console.log(result)
	} else {
		return result
	}
};


export {
	signInReq,
	signUpReq,
	refreshTokensReq,
	protectedReq,
	addInfo,
	addPhoto,
	fetchData
};
