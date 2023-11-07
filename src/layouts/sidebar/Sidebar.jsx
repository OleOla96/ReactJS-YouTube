import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classname from 'classnames/bind';
import SidebarItem from './SidebarItem';
import styles from './sidebar.module.scss';
import Button from '~/components/button/Button';
import {
  HomeIcon,
  HomeActiveIcon,
  ShortsIcon,
  ShortsActiveIcon,
  LibraryIcon,
  LibraryActiveIcon,
  SubscriptionsIcon,
  SubscriptionsActiveIcon,
  HistoryIcon,
  HistoryActiveIcon,
  YourVideosIcon,
  WatchLaterIcon,
  WatchLaterActiveIcon,
  YourClipsIcon,
  YourClipsActiveIcon,
  EntryRenderDownIcon,
  LikedVideosIcon,
  LikedVideosActiveIcon,
  MixIcon,
  ListIcon,
  EntryRenderUpIcon,
  TrendingIcon,
  MusicIcon,
  GamingIcon,
  NewsIcon,
  SportIcon,
} from '~/components/icons';

const cb = classname.bind(styles);

const Sidebar = ({ sidebarFull = true, auth }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [hide, setHide] = useState(true);
  const hanldeLogin = () => {
    navigate('/login', { state: { from: pathname } });
  };
  return (
    <div className={cb('wrap')}>
      <SidebarItem title="Home" link={'/'} icon={<HomeIcon />} mini={!sidebarFull} activeIcon={<HomeActiveIcon />} />
      <SidebarItem
        title="Shorts"
        link={'/shorst'}
        icon={<ShortsIcon />}
        mini={!sidebarFull}
        activeIcon={<ShortsActiveIcon />}
      />
      <SidebarItem
        title="Subscriptions"
        link={'/subscriptions'}
        icon={<SubscriptionsIcon />}
        mini={!sidebarFull}
        activeIcon={<SubscriptionsActiveIcon />}
      />
      {sidebarFull && <div className={cb('dropdown-divider')}></div>}
      <SidebarItem
        title="Library"
        link={'/library'}
        icon={<LibraryIcon />}
        mini={!sidebarFull}
        activeIcon={<LibraryActiveIcon />}
      />
      {sidebarFull && (
        <>
          <SidebarItem
            title="History"
            link={'/history'}
            icon={<HistoryIcon />}
            mini={!sidebarFull}
            activeIcon={<HistoryActiveIcon />}
          />

          <SidebarItem
            title="Your videos"
            link={'/yourvideos'}
            icon={<YourVideosIcon />}
            mini={!sidebarFull}
            activeIcon={<YourVideosIcon />}
          />
          <SidebarItem
            title="Watch Later"
            link={'/watchlater'}
            icon={<WatchLaterIcon />}
            mini={!sidebarFull}
            activeIcon={<WatchLaterActiveIcon />}
          />
          <SidebarItem
            title="Your clips"
            link={'/yourclips'}
            icon={<YourClipsIcon />}
            mini={!sidebarFull}
            activeIcon={<YourClipsActiveIcon />}
          />
          {hide ? (
            <button className={cb('btnSidebar')} onClick={() => setHide(!hide)}>
              <span className={cb('icon')}>
                <EntryRenderDownIcon />
              </span>
              <span className={cb('title', 'text-left')}>Show more</span>
            </button>
          ) : (
            <>
              <SidebarItem
                title="Liked videos"
                link={'/likedvideos'}
                icon={<LikedVideosIcon />}
                mini={!sidebarFull}
                activeIcon={<LikedVideosActiveIcon />}
              />
              <SidebarItem
                title="ReactJS"
                link="/reactjs"
                icon={<MixIcon />}
                mini={!sidebarFull}
                activeIcon={<MixIcon />}
              />

              <SidebarItem
                title="ReactJS"
                link="/reactjs"
                icon={<ListIcon />}
                mini={!sidebarFull}
                activeIcon={<ListIcon />}
              />
              <button className={cb('btnSidebar')} onClick={() => setHide(!hide)}>
                <span className={cb('icon')}>
                  <EntryRenderUpIcon />
                </span>
                <span className={cb('title', 'text-left')}>Show fewer</span>
              </button>
            </>
          )}
          <div className={cb('dropdown-divider')}></div>
          {!auth?.accessToken && (
            <>
              <div className={cb('signin-sidebar')}>
                <div className={cb('des-signin')}>Sign in to like videos, comment and subscribe.</div>
                <Button
                  onClick={hanldeLogin}
                  leftIcon={<i className={cb('fa-regular fa-circle-user', 'icon-signin')} />}
                  outline
                  rounded
                >
                  Sign in
                </Button>
              </div>
              <div className={cb('dropdown-divider')}></div>
            </>
          )}
          <div className={cb('headerGroup')}>Explore</div>
          <SidebarItem
            title="Trending"
            link={'/trending'}
            icon={<TrendingIcon />}
            mini={!sidebarFull}
            activeIcon={<TrendingIcon />}
          />
          <SidebarItem
            title="Music"
            link={'/music'}
            icon={<MusicIcon />}
            mini={!sidebarFull}
            activeIcon={<MusicIcon />}
          />
          <SidebarItem
            title="Gaming"
            link={'/gaming'}
            icon={<GamingIcon />}
            mini={!sidebarFull}
            activeIcon={<GamingIcon />}
          />
          <SidebarItem title="News" link={'/news'} icon={<NewsIcon />} mini={!sidebarFull} activeIcon={<NewsIcon />} />
          <SidebarItem
            title="Sport"
            link={'/sport'}
            icon={<SportIcon />}
            mini={!sidebarFull}
            activeIcon={<SportIcon />}
          />
        </>
      )}
    </div>
  );
};
export default Sidebar;
