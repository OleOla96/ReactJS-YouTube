import { Link } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BASE_URL } from '~/common/axios';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import { getContents } from '~/app/features/contents/contentsApi';
import { selectAllContents } from '~/app/features/contents/contentsSlice';
import { selectAuth } from '~/app/features/auth/authSlice';
import TimeFromNow from '~/components/timeFromNow';
import ViewCount from '~/components/count/ViewCount';

const Home = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const axiosAuth = useAxiosPrivate();
  const { accessToken } = useSelector(selectAuth);
  const { data, totalPages, message, status } = useSelector(selectAllContents);
  const [hasMore, setHasMore] = useState(true);
  const extension = ['.mp4', '.mkv', '.mov'];
  const getData = async (page) => {
    if (!accessToken) await getContents(page, dispatch);
    else await getContents(page, dispatch, axiosAuth);
  };
  useEffect(() => {
    getData(page);
    // eslint-disable-next-line
  }, []);

  let result;
  if (status === 'loading') {
    result = <p>"Loading..."</p>;
  } else if (status === 'succeeded') {
    result = data.map((item) => (
      <div className="col-sm-6 col-lg-4" key={item?.id}>
        <div className={'cardYoutube card mt-4'}>
          <Link to={`watch/${item?.linkVideo}`}>
            {extension.some((ex) => item?.videoName.endsWith(ex)) ? (
              <video
                loading="lazy"
                className="card-img-top"
                src={`${BASE_URL}video/${item?.videoName}`}
                alt={item?.title}
              />
            ) : (
              <img
                loading="lazy"
                className="card-img-top"
                src={`https://i.ytimg.com/vi/${item?.linkVideo}/maxresdefault.jpg`}
                alt={item?.title}
              />
            )}
          </Link>
          <div className="card-des mt-4">
            <Link to={`channel/${item?.user?.channelName}`} className="mr-3">
              {item?.user?.avatar ? (
                <img src={`${BASE_URL}image/avatar/${item?.user?.avatar}`} alt="" className="avatar" />
              ) : (
                <div className="avatar">{item?.user?.channelName?.slice(0, 1).toUpperCase()}</div>
              )}
            </Link>
            <div className="inforBase">
              <Link to={`watch/${item?.linkVideo}`} className="card-title">
                {item?.title}
              </Link>
              <Link to={`channel/${item?.user?.channelName}`} className="text-infor">
                {item?.user?.channelName}
              </Link>
              <span className="text-viewCount">
                <ViewCount views={item?.view} />
                &ensp;
                <TimeFromNow timestamp={item?.createdAt} />
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
  } else if (status === 'failed') {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  const getMoreData = () => {
    const nextPage = page + 1;
    getData(nextPage);
    if (totalPages === 1) {
      setHasMore(false);
    } else if (totalPages === nextPage) {
      setHasMore(false);
    } else {
      setPage(nextPage);
    }
  };

  return (
    <>
      <ToastContainer limit={2} />
      <InfiniteScroll
        dataLength={data?.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          data?.length > 0 ? null : (
            <p style={{ textAlign: 'center' }}>
              <b>Op not content !</b>
            </p>
          )
        }
      >
        <div className="row">{result}</div>
      </InfiniteScroll>
    </>
  );
};

export default memo(Home);
