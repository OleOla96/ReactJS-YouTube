import { Link } from 'react-router-dom';
import { useState } from 'react';
import classname from 'classnames/bind';
import styles from './header.module.scss';
import SidebarItem from '../sidebar/SidebarItem';
import Button from '~/components/button/Button';
import {
  LogoIcon,
  SidebarIcon,
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
} from '../../components/icons';

const cb = classname.bind(styles);

function SideEffect({ setSidebarFull, change = true, auth, hanldeLogin }) {
  const [hide, setHide] = useState(true);

  return (
    <>
      <input className={cb('btnSidebar-sup')} hidden type="checkbox" id="checkSidebar" />
      <label htmlFor="checkSidebar" className={cb('bg-cl-fade')}></label>
      <label
        htmlFor={change ? 'checkSidebar' : ''}
        className={cb('btn-circle', 'btn')}
        onClick={() => !change && setSidebarFull((s) => !s)}
      >
        <SidebarIcon className={cb('size-icon')} />
      </label>
      <div className={cb('showFull-Sidebar')}>
        <div className={cb('headerSidebar', 'ml-4')}>
          <label htmlFor="checkSidebar" className={cb('btn-circle', 'btn')}>
            <SidebarIcon className={cb('size-icon')} />
          </label>
          <div className={cb('logoHeader')}>
            <Link to={'/'} className={cb('navbarBrand')}>
              <LogoIcon className={cb('brandIcon')} />
            </Link>
            <span className={cb('brandIcon-sup')}>VN</span>
          </div>
        </div>
        <div className={cb('wrap')}>
          <SidebarItem title="Home" link={'/'} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
          <SidebarItem title="Shorts" link={'/shorts'} icon={<ShortsIcon />} activeIcon={<ShortsActiveIcon />} />
          <SidebarItem
            title="Subscriptions"
            link={'/subscriptions'}
            icon={<SubscriptionsIcon />}
            activeIcon={<SubscriptionsActiveIcon />}
          />
          <div className={cb('dropdown-divider')}></div>
          <SidebarItem title="Library" link={'/library'} icon={<LibraryIcon />} activeIcon={<LibraryActiveIcon />} />
          <SidebarItem title="History" link={'/history'} icon={<HistoryIcon />} activeIcon={<HistoryActiveIcon />} />
          <SidebarItem
            title="Your videos"
            link={'/yourvideos'}
            icon={<YourVideosIcon />}
            activeIcon={<YourVideosIcon />}
          />
          <SidebarItem
            title="Watch Later"
            link={'/watchlater'}
            icon={<WatchLaterIcon />}
            activeIcon={<WatchLaterActiveIcon />}
          />
          <SidebarItem
            title="Your clips"
            link={'/yourclips'}
            icon={<YourClipsIcon />}
            activeIcon={<YourClipsActiveIcon />}
          />
          {hide ? (
            <button className="btnSidebar" onClick={() => setHide(!hide)}>
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
                activeIcon={<LikedVideosActiveIcon />}
              />
              <SidebarItem title="ReactJS" link="/reactjs" icon={<MixIcon />} activeIcon={<MixIcon />} />
              <SidebarItem title="NodeJS" link="/nodejs" icon={<ListIcon />} activeIcon={<ListIcon />} />
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
          <SidebarItem title="Trending" link={'/trending'} icon={<TrendingIcon />} activeIcon={<TrendingIcon />} />
          <SidebarItem title="Music" link={'/music'} icon={<MusicIcon />} activeIcon={<MusicIcon />} />
          <SidebarItem title="Gaming" link={'/gaming'} icon={<GamingIcon />} activeIcon={<GamingIcon />} />
          <SidebarItem title="News" link={'/news'} icon={<NewsIcon />} activeIcon={<NewsIcon />} />
          <SidebarItem title="Sport" link={'/sport'} icon={<SportIcon />} activeIcon={<SportIcon />} />
        </div>
      </div>
    </>
  );
}

export default SideEffect;
