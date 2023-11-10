import { Link } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '~/common/axios';
import { BASE_URL } from '~/common/axios';
import useContexts from '~/hooks/useContexts';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

const Home = () => {
  const { auth } = useContexts();
  const axiosPrivate = useAxiosPrivate();
  const [contents, setContents] = useState([]);
  const extension = ['.mp4', '.mkv', '.mov'];

  useEffect(() => {
    const getData = async () => {
      try {
        if (!auth?.accessToken) {
          const res = await axios.get('show/all');
          setContents(res.data);
        } else {
          const res = await axiosPrivate.get('show/all');
          setContents(res.data);
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
  }, []);

  return (
    <div className="row">
      <ToastContainer limit={2} />
      {contents.map((content) => (
        <div className="col-sm-6 col-lg-4" key={content?.id}>
          <div className={'cardYoutube card mt-4'}>
            <Link to={`watch/${content?.linkVideo}`}>
              {content?.linkVideo && extension.some((ex) => content?.linkVideo.endsWith(ex)) ? (
                <video
                  loading="lazy"
                  className="card-img-top"
                  src={`${BASE_URL}video/${content?.linkVideo}`}
                  alt={content?.title}
                />
              ) : (
                <img
                  loading="lazy"
                  className="card-img-top"
                  src={`https://i.ytimg.com/vi/${content?.linkVideo}/maxresdefault.jpg`}
                  alt={content?.title}
                />
              )}
            </Link>
            <div className="card-des mt-4">
              <Link to={`channel/${content?.user?.channelName}`} className="mr-3">
                {content?.user?.avatar ? (
                  <img src={`${BASE_URL}image/avatar/${content?.user?.avatar}`} alt="" className="avatar" />
                ) : (
                  <div className="avatar">{content?.user?.channelName?.slice(0, 1).toUpperCase()}</div>
                )}
              </Link>
              <div className="inforBase">
                <Link to={`watch/${content?.linkVideo}`} className="card-title">
                  {content?.title}
                </Link>
                <Link to={`channel/${content?.user?.channelName}`} className="text-infor">
                  {content?.user?.channelName}
                </Link>
                <span className="text-viewCount">
                  {content?.view} view{content?.view > 1 && 's'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(Home);
