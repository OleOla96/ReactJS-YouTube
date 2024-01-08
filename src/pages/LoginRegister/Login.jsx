import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import classname from 'classnames/bind';
import styles from './loginRegister.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useInput from '~/hooks/useInput';
import useToggle from '~/hooks/useToggle';
import Button from '~/components/button/Button';
import { LogoLoginGoogle } from '~/components/icons';
import { useDispatch } from 'react-redux';
import { setCredentials } from '~/app/features/auth/authSlice';
import axios from '~/common/axios';

const cb = classname.bind(styles);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const [username, resetUsername, userAttribs] = useInput('username', '');
  const [password, setPassword] = useState('');
  const [check, toggleCheck] = useToggle('persist', true);
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (location?.state?.message)
      toast.success(location.state.message, {
        position: toast.POSITION.TOP_CENTER,
      });
  }, [location?.state?.message]);
  useEffect(() => {
    if (username && password) setSubmit(true);
    else setSubmit(false);
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        'auth/signin',
        { username, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      dispatch(setCredentials({ ...res.data }));
      resetUsername();
      setPassword('');
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      const err = error?.response?.data?.message || error.response.message || error.message;
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className={cb('login-register', 'mt5')}>
      <ToastContainer autoClose={2000} />
      <div className={cb('card-validate')}>
        <div className={cb('logo-login')}>
          <LogoLoginGoogle />
        </div>
        <form onSubmit={handleLogin}>
          <div className={cb('form-group')}>
            <label htmlFor="user">Username:</label>
            <input autoFocus id="user" type="text" className={cb('form-control')} {...userAttribs} required />
          </div>
          <div className={cb('form-group')}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              className={cb('form-control')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-check pl-20">
            <input type="checkbox" id="persist" onChange={toggleCheck} checked={check} className="form-check-input" />
            <label className="form-check-label" htmlFor="persist">
              Keep login
            </label>
          </div>
          <div className="form-group mt5">
            <Button rounded submit className="btn-block" disabled={!submit || loading}>
              {loading && <i style={{ lineHeight: 'inherit' }} className="fas fa-spinner fa-pulse mr-3" />}
              Login
            </Button>
          </div>
          <p className={cb('text-login-register')}>
            If you don't have an account, click&nbsp;
            <Link to="/register">create</Link> an account.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
