import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isEmail } from 'validator';
import classname from 'classnames/bind';
import styles from './loginRegister.module.scss';
import Button from '~/components/button/Button';
import axios from '~/common/axios';

const cb = classname.bind(styles);

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmedPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required')
        .matches(/^[A-z][A-z0-9-_]{3,23}$/, 'Must be 3 characters or more'),
      email: Yup.string()
        .required('Required')
        .test('is-email', 'Invalid email address', (value) => isEmail(value)),
      password: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
          `8 to 24 characters. Must include uppercase and lowercase letters, 
          a number and a special character. Allowed special characters: ! @ # $ %`,
        ),
      confirmedPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'The re-entered password does not match'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { username, email, password } = values;
        await axios.post('auth/signup', { username, email, password });
        navigate('/login', { state: { message: 'You have successfully registered' } });
      } catch (error) {
        setLoading(false);
        const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
  });

  return (
    <div className={cb('login-register')}>
      <ToastContainer />
      <div className={cb('card-validate')}>
        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className={cb('profile-img-card')} />
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              autoFocus
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.username && formik.touched.username && (
              <p className="form-invalid" role="alert">
                {formik.errors.username}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="form-invalid" role="alert">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="form-invalid" role="alert">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmedPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmedPassword"
              className="form-control"
              name="confirmedPassword"
              value={formik.values.confirmedPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirmedPassword && formik.touched.confirmedPassword && (
              <p className="form-invalid" role="alert">
                {formik.errors.confirmedPassword}
              </p>
            )}
          </div>

          <div className="form-group mt5">
            <Button rounded submit className="btn-block" disabled={!(formik.dirty && formik.isValid)} type="submit">
              {loading && <i style={{ lineHeight: 'inherit' }} className="fas fa-spinner fa-pulse mr-3" />}
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
