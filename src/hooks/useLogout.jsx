import { useDispatch } from 'react-redux';
import axios from '~/common/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logOut } from '~/app/features/auth/authSlice';

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      const res = await axios.get('auth/signout', {
        withCredentials: true,
      });
      dispatch(logOut());
      localStorage.removeItem('avatar');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      console.log(res.data.message);
      toast.success(res.data.message, {
        autoClose: 1000,
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error(error);
      const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
      toast.error(err, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return logout;
};

export default useLogout;
