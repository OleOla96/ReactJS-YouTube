import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import classNames from 'classnames/bind';
import style from './watch.scss';
import { LikeIcon, DisLikeIcon, ShareIcon } from '../../components/icons';

const cb = classNames.bind(style);

function Private() {
  const { linkVideo } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [content, setContent] = useState({});
  const [listVideos, setListVideos] = useState([]);
  const [changeVideo, setChangeVideo] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosPrivate.get(`myChannel/watch${linkVideo}`);
        if (res?.data?.length) {
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

  return (
    <div className={cb('watch', 'mt-4')}>
      <ToastContainer autoClose={2000} limit={2} />
      <div className={'col-md-12 col-lg-8'}>
        <div className="resize">
          <iframe
            className={cb('screenVideo')}
            width="854"
            height="428"
            src={`https://www.youtube.com/embed/${content?.linkVideo}`}
            title={content?.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className={cb('top-row', 'mt-4')}>
          <div className="card-title mg-2">{content?.title}</div>
          <div className="subWarp">
            <div className="left">
              <Link to={`channel/${content?.channelName}`} className={cb('avatar')}>
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
            </div>
            <div className="right">
              <div className="btn-multi">
                <button disabled className={cb('btn-child', 'start', 'px-4')}>
                  <LikeIcon className={'likeIcon start'} />
                  {content?.like}
                </button>
                <span className="divider-y"></span>
                <button disabled className={cb('btn-child', 'end', 'px-4')}>
                  <DisLikeIcon className={'likeIcon start'} />
                  {content?.disLike}
                </button>
              </div>
              <div className="ml-3">
                <button style={{ fontWeight: 500 }} className="btn-main bg-005">
                  <ShareIcon className="mr-2" />
                  Share
                </button>
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

export default memo(Private);
