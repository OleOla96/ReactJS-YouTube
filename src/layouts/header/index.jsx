import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import className from 'classnames/bind';
import styles from './header.module.scss';
import Tippy from '@tippyjs/react';
import Search1 from '../search/Search1';
import Search2 from '../search/Search2';
import SidebarEffect from './SidebarEffect';
import { BellIcon, CameraIcon, CreateLinkIcon, LogoIcon, VoiceIcon, YourVideosIcon } from '~/components/icons';
import Button from '~/components/button/Button';
import Menu from './Menu';
import { selectAuth } from '~/app/features/auth/authSlice';

const cb = className.bind(styles);

function HeaderMain({ setSidebarFull, change }) {
  const auth = useSelector(selectAuth);
  const avatar = localStorage.getItem('avatar') ? localStorage.getItem('avatar') : null;
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const hanldeLogin = () => {
    navigate('/login', { state: { from: pathname === '/register' ? '/' : pathname } });
  };

  return (
    <nav className={cb('header')}>
      <div className={cb('headerLeft')}>
        <SidebarEffect setSidebarFull={setSidebarFull} change={change} auth={auth} onLogin={hanldeLogin} />
        <div className={cb('logoHeader')}>
          <Link to={'/'} className={cb('navbarBrand')}>
            <LogoIcon className={cb('brandIcon')} />
          </Link>
          <span className={cb('brandIcon-sup')}>VN</span>
        </div>
      </div>
      <div className={cb('headerCenter')}>
        <Search1 />
        <Search2 />
        <Tippy content="Search with your voice">
          <button className={cb('btn-circle', 'layout', 'bg-005')}>
            <VoiceIcon className={cb('size-icon')} />
          </button>
        </Tippy>
      </div>
      {auth.accessToken ? (
        <div className={cb('headerRight')}>
          <input type="checkbox" hidden id="checkDropdown-create" className={cb('checkDropdown-menu-create')} />
          <label htmlFor="checkDropdown-create" className={cb('bg-cl-trans-1')}></label>
          <Tippy content="Create">
            <label htmlFor="checkDropdown-create" className={cb('btn-circle mb-0', 'mr-8px')}>
              <CameraIcon className={cb('size-icon')} />
            </label>
          </Tippy>
          <div className={cb('dropdown-menu-create')}>
            <Link to={'/create-link'} className={cb('btn mt-3 text-left', 'dropdown-item')}>
              <YourVideosIcon className={cb('size-icon', 'item')} />
              Create link
            </Link>
            <Link to={'/upload'} className={cb('btn mb-3 text-left', 'dropdown-item')}>
              <CreateLinkIcon className={cb('size-icon', 'item')} />
              Upload video
            </Link>
          </div>
          <Tippy content="Notifications">
            <button className={cb('btn-circle', 'mr-8px', 'hideOnMoblie')}>
              <BellIcon className={cb('size-icon')} />
            </button>
          </Tippy>
          <Menu auth={auth} avatar={avatar} />
        </div>
      ) : (
        <div className={cb('headerRight', 'ml-3')}>
          <Button
            onClick={hanldeLogin}
            leftIcon={<i className={cb('fa-regular fa-circle-user', 'icon-signin')} />}
            outline
            rounded
          >
            Sign in
          </Button>
        </div>
      )}
    </nav>
  );
}

export default HeaderMain;
