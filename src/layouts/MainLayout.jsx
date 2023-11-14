import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames/bind';
import style from './layout.module.scss';
import Header from './header';
import Sidebar from './sidebar/Sidebar';

const cb = classname.bind(style);

function MainLayout({ children }) {
  const [sidebarFull, setSidebarFull] = useState(window.innerWidth >= 1016);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setChange(window.innerWidth < 1016);
      if (sidebarFull) setSidebarFull(window.innerWidth >= 1016);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarFull]);

  return (
    <>
      <Header setSidebarFull={setSidebarFull} change={change} />
      <div className={cb('container')}>
        <div className={cb('left', { action: sidebarFull })}>
          <Sidebar sidebarFull={sidebarFull} />
        </div>
        <div className={cb('right')}>{children}</div>
      </div>
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
