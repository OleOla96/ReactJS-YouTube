import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames/bind';
import style from './defaultLayout.module.scss';
import HeaderMain from './header/HeaderMain';
import Sidebar from './sidebar/Sidebar';
import useContexts from '../hooks/useContexts';

const cb = classname.bind(style);

function DefaultLayout({ children }) {
  const { auth } = useContexts();
  const [sidebarFull, setSidebarFull] = useState(window.innerWidth >= 1016);
  const [change, setChange] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setChange(window.innerWidth < 1016);
      setSidebarFull(window.innerWidth >= 1016);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <HeaderMain setSidebarFull={setSidebarFull} change={change} />
      <div className={cb('container')}>
        <div className={cb('left', { action: sidebarFull })}>
          <Sidebar sidebarFull={sidebarFull} auth={auth} />
        </div>
        <div className={cb('right')}>{children}</div>
      </div>
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
