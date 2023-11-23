import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import classname from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useContexts from '~/hooks/useContexts';
import useInput from '~/hooks/useInput';
import useToggle from '~/hooks/useToggle';
import axios from '~/common/axios';
import styles from './loginRegister.module.scss';
import { LogoLoginGoogle } from '~/components/icons';

const cb = classname.bind(styles);

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const { setAuth, setAvatar } = useContexts();
  const [username, resetUser, userAttribs] = useInput('user', '');
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
      const accessToken = res.data?.accessToken;
      if (res.data.avatar) {
        setAvatar(res.data.avatar);
        localStorage.setItem('avatar', res.data.avatar);
      }
      setLoading(false);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setAuth({ username, accessToken });
      resetUser();
      setPassword('');
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
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
            <label htmlFor="username">Username:</label>
            <input autoFocus id="username" type="text" className={cb('form-control')} {...userAttribs} required />
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
            <button
              style={{ lineHeight: '1.8' }}
              className="btn-round btn-primary btn-block btn-state"
              disabled={!submit || loading}
            >
              {loading && <i style={{ lineHeight: 'inherit' }} className="fas fa-spinner fa-pulse mr-3" />}
              Login
            </button>
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
