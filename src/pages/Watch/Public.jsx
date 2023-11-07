import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './watch.scss';
import axios from '../../common/axios';
import useContexts from '../../hooks/useContexts';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { BellIcon, LikeIcon, LikeActionIcon, DisLikeIcon, DisLikeActionIcon, ShareIcon } from '~/components/icons';
import Button from '~/components/button/Button';

const cb = classNames.bind(styles);

function Public() {
  const { auth } = useContexts();
  const { linkVideo } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [content, setContent] = useState({});
  const [listVideos, setListVideos] = useState([]);
  const [changeVideo, setChangeVideo] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!auth.accessToken) {
          const res = await axios.get(`show/watch${linkVideo}`);
          const resData = res.data;
          for (let i in resData) {
            if (resData[i].linkVideo === linkVideo) {
              setContent(resData[i]);
              resData.splice(i, 1);
              setListVideos(resData);
              break;
            }
          }
        } else {
          const res = await axiosPrivate.get(`show/watch${linkVideo}`);
          const resData = res.data;
          for (let i in resData) {
            if (resData[i].linkVideo === linkVideo) {
              setContent(resData[i]);
              resData.splice(i, 1);
              setListVideos(resData);
              break;
            }
          }
        }
      } catch (error) {
        const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };

    getData();
    // eslint-disable-next-line
  }, [changeVideo]);

  const handleSubcribe = async (v) => {
    try {
      const res = await axiosPrivate.patch(`content/subscriber?channelId=${content.userId}&v=${v}`);
      toast.success(res.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setChangeVideo((pre) => !pre);
    } catch (error) {
      const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
      toast.error(err, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };
  const handleLike = async (v, t = '') => {
    try {
      const res = await axiosPrivate.patch(`content/like?id=${content.id}&v=${v}&t=${t}`);
      if (res?.data?.message?.length > 0)
        toast.success(res.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      setChangeVideo((pre) => !pre);
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
      <ToastContainer autoClose={1000} limit={2} />
      <div className={'col-md-12 col-lg-8'}>
        <div className="resize">
          <iframe
            className={cb('screenVideo')}
            width="854"
            height="428"
            src={`https://www.youtube.com/embed/${content?.linkVideo}?autoplay=0`}
            title={content?.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className={cb('top-row', 'mt-4')}>
          <div className="card-title mb-2">{content?.title}</div>
          <div className="subWarp">
            <div className={cb('left')}>
              {/* <Button circle to={`channel/${content?.channelName}`} className={cb('avatarDefault')}>
                {content?.channelName?.slice(0, 1).toUpperCase()}
              </Button> */}
              <Link to={`/channel/${content?.channelName}`} className={cb('avatarDefault')}>
                {content?.channelName?.slice(0, 1).toUpperCase()}
              </Link>
              <div className="inforChanel">
                <Link to={`channel/${content?.channelName}`} className={cb('text-channel')}>
                  {content?.channelName}
                </Link>
                <span className={cb('text-infor')}>
                  {content?.subscriber} subcriber{content?.subscriber > 1 && 's'}
                </span>
              </div>
              {content.username === auth.username ? (
                <></>
              ) : auth.accessToken ? (
                content?.follow ? (
                  <Button
                    primary
                    onClick={() => handleSubcribe(false)}
                    leftIcon={<BellIcon className={cb('size-icon')} />}
                  >
                    Subscribed
                  </Button>
                ) : (
                  <Button onClick={() => handleSubcribe(true)} primary className={'bg-black'}>
                    Subscribe
                  </Button>
                )
              ) : (
                <Button onClick={hanldeLogin} primary className={'bg-black'}>
                  Subscribe
                </Button>
              )}
            </div>
            <div className={cb('right')}>
              <div className="btn-multi">
                {content?.statusLike === true ? (
                  <Tippy content="Unlike" placement="bottom">
                    <button
                      disabled={content.username === auth.username}
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
                      disabled={content.username === auth.username}
                      onClick={() => (auth?.accessToken ? handleLike(true) : hanldeLogin())}
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
                      disabled={content.username === auth.username}
                      onClick={() => handleLike(null, 'undislike')}
                      className={cb('btn-child', 'end', 'px-4')}
                    >
                      <DisLikeActionIcon className={'likeIcon start'} />
                      {content?.disLike}
                    </button>
                  </Tippy>
                ) : (
                  <Tippy content="I dislike this" placement="bottom">
                    <button
                      disabled={content.username === auth.username}
                      onClick={() => (auth?.accessToken ? handleLike(false) : hanldeLogin())}
                      className={cb('btn-child', 'end', 'px-4')}
                    >
                      <DisLikeIcon className={'likeIcon start'} />
                      {content?.disLike}
                    </button>
                  </Tippy>
                )}
              </div>
              <div className="ml-3">
                <Button primary leftIcon={<ShareIcon />}>
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-row mt-4">
          <div className={cb('text-viewCount')}>
            {content?.view} view{content?.view > 1 && 's'}
          </div>
          <div className="text-des">{content?.description}</div>
        </div>
        <div className="col-12 wrapCardSidebar">
          {listVideos.map((data) => (
            <div key={data?.id} className={cb('cardSidebar', 'card mb-4')}>
              <Link to={`/watch/${data?.linkVideo}`} onClick={() => setChangeVideo(!changeVideo)}>
                <img
                  className="card-img-top "
                  src={`https://i.ytimg.com/vi/${data?.linkVideo}/maxresdefault.jpg`}
                  alt={data?.title}
                />
              </Link>
              <Link to={`/watch/${data?.linkVideo}`} className="card-text">
                <span className="cardSidebar-title">{data?.title}</span>
                <span className="cardSidebar-channel">{data?.channelName}</span>
                <span className="text-infor">
                  {data?.view} view{data?.view > 1 && 's'}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={'col-4'}>
        {listVideos.map((data) => (
          <div key={data?.id} className={cb('cardSidebar', 'card mb-4')}>
            <Link to={`/watch/${data?.linkVideo}`} onClick={() => setChangeVideo(!changeVideo)}>
              <img
                className="card-img-top "
                src={`https://i.ytimg.com/vi/${data?.linkVideo}/maxresdefault.jpg`}
                alt={data?.title}
              />
            </Link>
            <Link to={`/watch/${data?.linkVideo}`} className="card-text">
              <span className="cardSidebar-title">{data?.title}</span>
              <span className="cardSidebar-channel">{data?.channelName}</span>
              <span className="text-infor">
                {data?.view} view{data?.view > 1 && 's'}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Public);
