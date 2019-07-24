import { getUserInfo } from '../helpers/apiHelper';

export const fetchData = async(dispatch, accessToken) => {
  const result = await getUserInfo(accessToken);
  if (result.success) {
    const {
      login,
      name,
      lastname,
      drinks,
      city,
      photo,
    } = result.bio;
    
    dispatch({ type: 'ADD_INFO', payload: { name, lastname, city, drinks } });
    dispatch({ type: 'ADD_PHOTO', payload: photo });
    dispatch({ type: 'LOGIN', payload: login });
    return result.bio;
  } return { message: 'User not found' };
};
