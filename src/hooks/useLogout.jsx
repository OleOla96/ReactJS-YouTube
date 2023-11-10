import axios from '../common/axios';
import useContexts from './useContexts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useLogout = () => {
  const { setAuth, setAvatar } = useContexts();

  const logout = async () => {
    setAuth({});
    setAvatar();
    localStorage.removeItem('avatar');
    try {
      const res = await axios.get('auth/signout', {
        withCredentials: true,
      });
      console.log(res.data.message);
      toast.success(res.data.message, {
        autoClose: 1000,
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error(error);
      const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
      toast.error(err, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return logout;
};

export default useLogout;
