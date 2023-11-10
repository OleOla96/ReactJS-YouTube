import PropTypes from 'prop-types';
import classname from 'classnames/bind';
import style from './defaultLayout.module.scss';
import Header from './header/Header';
import useContexts from '../hooks/useContexts';

const cb = classname.bind(style);

function HeaderOnly({ children }) {
  const { auth, avatar } = useContexts();
  return (
    <div className={cb('container')}>
      <Header auth={auth} avatar={avatar} />
      <div className={cb('right')}>{children}</div>
    </div>
  );
}

HeaderOnly.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderOnly;
