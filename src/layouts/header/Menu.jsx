import { Link, useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './header.module.scss';
import { BASE_URL } from '~/common/axios';
import useLogout from '~/hooks/useLogout';
import { ChannelIcon, SingoutIcon, StudioIcon, SwitchIcon } from '~/components/icons';

const cb = className.bind(styles);

export default function Menu({ auth, avatar }) {
  const avatarURL = avatar ? `${BASE_URL}image/avatar/${avatar}` : avatar;
  const _logOut = useLogout();
  const navigate = useNavigate();
  const logOut = async () => {
    await _logOut();
    navigate('/');
  };
  return (
    <>
      <input type="checkbox" hidden id="checkDropdown" className={cb('checkDropdown-menu')} />
      <label htmlFor="checkDropdown" className={cb('bg-cl-trans-2')}></label>
      <label htmlFor="checkDropdown" className={cb('sizeM-bg')}>
        {avatarURL ? (
          <img src={avatarURL} alt="avatar" className="avatarHeader" />
        ) : (
          <div className="avatarHeader">{auth.username.slice(0, 1).toUpperCase()}</div>
        )}
      </label>
      <div className={cb('dropdown-menu')}>
        <div className={cb('baseProfile')}>
          <div className={cb('baseProfile-mr')}>
            {avatarURL ? (
              <img src={avatarURL} alt="avatar" className="avatarHeader" />
            ) : (
              <div className="avatarHeader">{auth.username.slice(0, 1).toUpperCase()}</div>
            )}
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
        <button className={cb('dropdown-item', 'text-left')} onClick={logOut}>
          <SingoutIcon className={cb('size-icon', 'item')} />
          Sign-out
        </button>
      </div>
    </>
  );
}
