import PropTypes from 'prop-types';
import classname from 'classnames/bind';
import style from './layout.module.scss';
import Header from './header';
import useContexts from '../hooks/useContexts';

const cb = classname.bind(style);

function HeaderOnly({ children }) {
  const { auth, avatar } = useContexts();
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
