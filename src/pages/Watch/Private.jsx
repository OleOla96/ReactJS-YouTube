import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { BASE_URL } from '~/common/axios';
import classNames from 'classnames/bind';
import style from './watch.scss';
import SideBar from './SideBar';
import { LikeIcon, DisLikeIcon, ShareIcon } from '~/components/icons';

const cb = classNames.bind(style);

function Private() {
  const { linkVideo } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [content, setContent] = useState({});
  const [listVideos, setListVideos] = useState([]);
  const avatarURL = `${BASE_URL}image/avatar/${content?.avatar}`;
  const videoURL = `${BASE_URL}video/${content?.videoName}`;
  const extension = ['.mp4', '.mkv', '.mov'];
  const videoLocal = content?.videoName && extension.some((ex) => content?.videoName.endsWith(ex));
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosPrivate.get(`myChannel/watch/${linkVideo}`);
        const resData = res.data;
        for (let i in resData) {
          if (resData[i].linkVideo === linkVideo) {
            setContent(resData[i]);
            resData.splice(i, 1);
            setListVideos(resData);
            break;
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
  }, [linkVideo, axiosPrivate]);

  return (
    <div className={cb('watch', 'mt-4')}>
      <ToastContainer autoClose={2000} limit={2} />
      <div className={'col-md-12 col-lg-8'}>
        {videoLocal ? (
          <video className={cb('screenVideo')} src={videoURL} controls />
        ) : (
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
        )}
        <div className={cb('top-row', 'mt-4')}>
          <div className="card-title mg-2">{content?.title}</div>
          <div className="subWarp">
            <div className="left">
              <Link to={`channel/${content?.channelName}`}>
                {content?.avatar ? (
                  <img src={avatarURL} alt="" className="avatarMain" />
                ) : (
                  <div className="avatarMain">{content?.channelName?.slice(0, 1).toUpperCase()}</div>
                )}
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
          <SideBar list={listVideos} URL={BASE_URL} extension={extension} />
        </div>
      </div>
      <div className={'col-4'}>
        <SideBar list={listVideos} URL={BASE_URL} extension={extension} />
      </div>
    </div>
  );
}

export default memo(Private);
