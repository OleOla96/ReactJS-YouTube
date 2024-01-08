import PropTypes from 'prop-types';
import classname from 'classnames/bind';
import style from './layout.module.scss';
import Header from './header';
import { useSelector } from 'react-redux';

const cb = classname.bind(style);

function HeaderOnly({ children }) {
  const auth = useSelector((state) => state.auth);
  const avatar = localStorage.getItem('avatar');
  return (
    <>
      <Header auth={auth} avatar={avatar} />
      <div className={cb('container')}>
        <div className={cb('right')}>{children}</div>
      </div>
    </>
  );
}

HeaderOnly.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderOnly;
