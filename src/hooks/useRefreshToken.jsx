import axios from '~/common/axios';
import { setCredentials } from '~/app/features/auth/authSlice';
import { useDispatch } from 'react-redux';
const useRefreshToken = () => {
  const dispatch = useDispatch();
  const username = localStorage.getItem('username');
  console.log(username);
  const refresh = async () => {
    const { data } = await axios.get('auth/refresh', {
      withCredentials: true,
    });
    dispatch(setCredentials({ ...data, username: username }));

    return data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
