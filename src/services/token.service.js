import { getFromStorage, setInStorage } from '../utils/storage';
import { protectedReq, refreshTokensReq } from '../helpers/apiHelper';

const refresh = async refreshToken => {
	const tokens = await refreshTokensReq(refreshToken);
	setInStorage('tokens', tokens);
};

const logOut = () => {
	setInStorage('tokens', {
		accessToken: '',
		expiresIn: '',
		refreshToken: '',
	});
};

export {
	refresh,
	logOut,
};
