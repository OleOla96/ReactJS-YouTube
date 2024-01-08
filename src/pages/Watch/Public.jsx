import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './watch.scss';
import { BASE_URL } from '~/common/axios';
import { BellIcon, LikeIcon, LikeActionIcon, DisLikeIcon, DisLikeActionIcon, ShareIcon } from '~/components/icons';
import Button from '~/components/button';
import SideBar from './SideBar';
import TimeFromNow from '~/components/timeFromNow';
import ViewCount from '~/components/count/ViewCount';
import SubscriberCount from '~/components/count/SubscriberCount';
import VideoPlayer from './VideoPlayer';
import { getContents } from '~/app/features/contents/contentsApi';
import { selectAuth } from '~/app/features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllContents } from '~/app/features/contents/contentsSlice';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

const cb = classNames.bind(styles);

function Public() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosAuth = useAxiosPrivate();
  const { linkVideo } = useParams();
  const { pathname } = useLocation();
  const { username, accessToken } = useSelector(selectAuth);
  const { data, message, state, currentPage } = useSelector(selectAllContents);
  const [content, setContent] = useState({});
  const [listVideos, setListVideos] = useState([]);
  const [watched, setWatched] = useState(false);
  const avatarURL = `${BASE_URL}image/avatar/${content?.user?.avatar}`;
  const videoURL = `${BASE_URL}video/${content?.videoName}`;
  const extension = ['.mp4', '.mkv', '.mov'];
  const videoLocal = content?.videoName && extension.some((ex) => content?.videoName.endsWith(ex));

  useEffect(() => {
    const getData = async (currentPage) => {
      if (!accessToken) {
        await getContents(currentPage, dispatch);
      } else {
        await getContents(currentPage, dispatch, axiosAuth);
      }
    };
    if (listVideos.length === 0) getData(currentPage);
    let initialValue = [...data];
    const indexToRemove = initialValue.findIndex((obj) => obj.linkVideo === linkVideo);
    if (indexToRemove !== -1) {
      setContent(initialValue.splice(indexToRemove, 1)[0]);
      setListVideos(initialValue);
    }
    // eslint-disable-next-line
  }, [linkVideo]);

  if (state === 'failed')
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });

  const handleSubcribe = async (v) => {
    try {
      const res = await axiosAuth.patch(`content/subscriber?channelId=${content.userId}&v=${v}`);
      toast.success(res.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      const { statusFollow, subscriber } = res.data;
      setContent({ ...content, statusFollow, user: { ...content.user, subscriber } });
    } catch (error) {
      const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
      toast.error(err, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };
  const handleLike = async (v, t = '') => {
    try {
      const res = await axiosAuth.patch(`content/like?id=${content.id}&v=${v}&t=${t}`);
      if (res?.data?.message?.length > 0)
        toast.success(res.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      const { like, dislike, statusLike } = res.data;
      setContent({ ...content, like, dislike, statusLike });
    } catch (error) {
      const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
      toast.error(err, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const hanldeLogin = () => {
    navigate('/login', { state: { from: pathname } });
  };

  return (
    <div className={cb('watch', 'mt-4')}>
      <ToastContainer autoClose={1000} limit={1} />
      <div className={'col-md-12 col-lg-8'}>
        <div className="resize">
          {videoLocal ? (
            <VideoPlayer src={videoURL} setWatched={setWatched} controls />
          ) : (
            <iframe
              className={cb('screenVideo')}
              width="854"
              height="428"
              src={`https://www.youtube.com/embed/${content?.linkVideo}?autoplay=1`}
              title={content?.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <div className={cb('top-row', 'mt-4')}>
          <div className="card-title">{content?.title}</div>
          <div className="subWarp">
            <div className={cb('left')}>
              <Link to={`channel/${content?.user?.channelName}`}>
                {content?.user?.avatar ? (
                  <img src={avatarURL} alt="" className="avatarMain" />
                ) : (
                  <div className="avatarMain">{content?.user?.channelName?.slice(0, 1).toUpperCase()}</div>
                )}
              </Link>
              <div className="inforChanel">
                <Link to={`channel/${content?.user?.channelName}`} className={cb('text-channel')}>
                  {content?.user?.channelName}
                </Link>
                <span className={cb('text-infor')}>
                  <SubscriberCount value={content?.user?.subscriber} />
                </span>
              </div>
              {content?.user?.username === username ? null : username ? (
                content?.statusFollow ? (
                  <Button primary onClick={() => handleSubcribe(false)} leftIcon={<BellIcon />} className="bg-005">
                    Subscribed
                  </Button>
                ) : (
                  <Button primary onClick={() => handleSubcribe(true)}>
                    Subscribe
                  </Button>
                )
              ) : (
                <Button onClick={hanldeLogin} primary>
                  Subscribe
                </Button>
              )}
            </div>
            <div className={cb('right')}>
              <div className="btn-multi bg-005">
                {content?.statusLike === true ? (
                  <Tippy content="Unlike" placement="bottom">
                    <button
                      disabled={content?.user?.username === username}
                      onClick={() => handleLike(null, 'unlike')}
                      className={cb('btn-child', 'start', 'px-4')}
                    >
                      <LikeActionIcon className={'likeIcon start'} />
                      {content?.like}
                    </button>
                  </Tippy>
                ) : (
                  <Tippy content="I like this" placement="bottom">
                    <button
                      disabled={content?.user?.username === username}
                      onClick={() => (username ? handleLike(true) : hanldeLogin())}
                      className={cb('btn-child', 'start', 'px-4')}
                    >
                      <LikeIcon className={'likeIcon start'} />
                      {content?.like}
                    </button>
                  </Tippy>
                )}
                <span className="divider-y"></span>
                {content?.statusLike === false ? (
                  <Tippy content="Undislike" placement="bottom">
                    <button
                      disabled={content?.user?.username === username}
                      onClick={() => handleLike(null, 'undislike')}
                      className={cb('btn-child', 'end', 'px-4')}
                    >
                      <DisLikeActionIcon className={'likeIcon start'} />
                      {content?.dislike}
                    </button>
                  </Tippy>
                ) : (
                  <Tippy content="I dislike this" placement="bottom">
                    <button
                      disabled={content?.user?.username === username}
                      onClick={() => (username ? handleLike(false) : hanldeLogin())}
                      className={cb('btn-child', 'end', 'px-4')}
                    >
                      <DisLikeIcon className={'likeIcon start'} />
                      {content?.dislike}
                    </button>
                  </Tippy>
                )}
              </div>
              <div className="ml-3">
                <Button primary leftIcon={<ShareIcon />} className="bg-005">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-row mt-4">
          <div className={cb('text-viewCount')}>
            <ViewCount views={content?.view} />
            &ensp;
            <TimeFromNow timestamp={content?.createdAt} />
          </div>
          <div className="text-des">{content?.description}</div>
        </div>
        <div className="col-12 wrapCardSidebar">
          <SideBar list={listVideos} />
        </div>
      </div>
      <div className="col-4">
        <SideBar list={listVideos} />
      </div>
    </div>
  );
}

export default memo(Public);
