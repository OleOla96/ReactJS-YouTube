import { Link, useNavigate, useLocation } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classname from 'classnames/bind';
import styles from './header.module.scss';
import useLogout from '../../hooks/useLogout';
import Search1 from '../search/Search1';
import Search2 from '../search/Search2';
import SideEffect from './SideEffect';
import {
  LogoIcon,
  BellIcon,
  VoiceIcon,
  CameraIcon,
  ChannelIcon,
  SingoutIcon,
  StudioIcon,
  SwitchIcon,
} from '../../components/icons';
import Button from '~/components/button/Button';

const cb = classname.bind(styles);

function Header({ auth }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const _logOut = useLogout();
  const logOut = async () => {
    await _logOut();
    navigate('/');
  };
  const hanldeLogin = () => {
    navigate('/login', { state: { from: pathname } });
  };

  return (
    <nav className={cb('header')}>
      <div className={cb('headerLeft')}>
        <SideEffect auth={auth} hanldeLogin={hanldeLogin} />
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
        <div className={cb('layout', 'bg-005')}>
          <Tippy content="Search with your voice">
            <button className={cb('btn-circle')}>
              <VoiceIcon className={cb('size-icon')} />
            </button>
          </Tippy>
        </div>
      </div>
      {Object.keys(auth).length ? (
        <div className={cb('headerRight')}>
          <Tippy content="Create">
            <Link to={'/content/create'} className={cb('btn-circle', 'mr-8px')}>
              <CameraIcon className={cb('size-icon')} />
            </Link>
          </Tippy>
          <Tippy content="Notifications">
            <button className={cb('btn-circle', 'mr-8px', 'hideOnMoblie')}>
              <BellIcon className={cb('size-icon')} />
            </button>
          </Tippy>
          <input type="checkbox" hidden id="checkDropdown" className={cb('checkDropdown-menu')} />
          <label htmlFor="checkDropdown" className={cb('bg-cl-trans')}></label>
          <label htmlFor="checkDropdown" className={cb('sizeM-bg')}>
            <span className={cb('bg-color', 'bgM-icon')}>{auth.username.slice(0, 1).toUpperCase()}</span>
          </label>
          <div className={cb('dropdown-menu')}>
            <div className={cb('baseProfile')}>
              <div className={cb('baseProfile-mr')}>
                <span className={cb('bg-color', 'bgM-icon')}>{auth.username.slice(0, 1).toUpperCase()}</span>
              </div>
              <div className={cb('inforProfile')}>
                <span className={cb('inforProfile-user')}>{auth.username}</span>
                <span>{auth.email}</span>
                <span className={cb('inforProfile-link')}>Manage your Google Account</span>
              </div>
            </div>
            <div className={cb('dropdown-divider')}></div>
            <Link className={cb('dropdown-item')} to={'/channel'}>
              <ChannelIcon className={cb('size-icon', 'item')} />
              Your channel
            </Link>
            <div className={cb('dropdown-item', 'btn')}>
              <StudioIcon className={cb('size-icon', 'item')} />
              YouTube Studio
            </div>
            <div className={cb('dropdown-item', 'btn')}>
              <SwitchIcon className={cb('size-icon', 'item')} />
              Switch account
            </div>
            <Link className={cb('dropdown-item')} to={'/'} onClick={logOut}>
              <SingoutIcon className={cb('size-icon', 'item')} />
              Sign-out
            </Link>
          </div>
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

export default Header;
