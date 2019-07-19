import { getFromStorage, setInStorage } from '../utils/storage';
import { refreshTokensReq } from '../helpers/apiHelper';

const refresh = async refreshToken => {
  const tokens = await refreshTokensReq(refreshToken);
  if (!tokens.success) return { tokenExpired: true };
  setInStorage('tokens', tokens);
  return { tokenExpired: false };
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
