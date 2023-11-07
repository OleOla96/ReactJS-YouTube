import classname from 'classnames/bind';
import style from './myChannel.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useContexts from '~/hooks/useContexts';
import axios from '~/common/axios';
import ChangeAvatar from './ChangeAvatar';

const cb = classname.bind(style);

const MyChannel = () => {
  const { auth } = useContexts();
  const [contents, setContents] = useState([]);
  const [imageURL, setImageURL] = useState('');
  const [changeAvatar, setChangeAvatar] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  console.log(imageURL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPrivate.get('roles/user');
        const resData = res.data;
        for (let i in resData) {
          if (resData[i].avatar) {
            console.log(`images/avatar/${resData[0].avatar}`);
            const avatar = await axios.get(`images/avatar/${resData[0].avatar}`, {
              responseType: 'arraybuffer',
            });
            const blob = new Blob([avatar.data], { type: 'image/jpeg' });
            setImageURL(URL.createObjectURL(blob));
            break;
          }
        }
        setContents(res.data);
      } catch (error) {
        console.log(error);
        const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [changeAvatar]);

  return (
    <div className={cb('channelContainer')}>
      <ToastContainer />
      {changeAvatar && <ChangeAvatar onChangeAvatar={setChangeAvatar} toast={toast} auth={auth} />}
      <div className={cb('channelHeader')}>
        {imageURL ? (
          <img src={imageURL} alt="avatar" className={cb('avatar', 'mr5')} />
        ) : (
          <button className={cb('avatar', 'mr5')} onClick={() => setChangeAvatar(!changeAvatar)}>
            {auth?.username?.slice(0, 1).toUpperCase()}
          </button>
        )}
        {auth && (
          <div className={cb('innerHeader')}>
            <div className={cb('innerHeader-meta')}>
              <h2>{auth.username}</h2>
              <p>{auth.email}</p>
              <p>
                {contents.length}&nbsp;{contents.length > 1 ? 'videos' : 'video'}
              </p>
            </div>
            <div className={cb('innerHeader-btn')}>
              <button className={cb('show-size-icon', 'mr-2')}>Customise channel</button>
              <button className={cb('show-size-icon')}>
                <Link to={'/managevideos'}>Manage videos</Link>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="row">
        {contents.length > 0 ? (
          contents.map((data) => (
            <div className="col-sm-6 col-lg-4" key={data.id}>
              <div className={'cardYoutube card mt-4'}>
                <Link to={`watch/${data.linkVideo}`}>
                  <img
                    className="card-img-top"
                    src={`https://i.ytimg.com/vi/${data.linkVideo}/maxresdefault.jpg`}
                    alt={data.title}
                  />
                </Link>
                <div className="card-body">
                  <Link to={`watch/${data.linkVideo}`} className="card-text">
                    {data.title}
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span className="text-center" style={{ width: '80%' }}>
            No content.
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(MyChannel);
