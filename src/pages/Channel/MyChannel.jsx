import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import ChangeAvatar from './ChangeAvatar';
import Button from '~/components/button/Button';
import { BASE_URL } from '~/common/axios';
import className from 'classnames/bind';
import style from './myChannel.module.scss';
import { EditAvatarIcon } from '~/components/icons';
import { useSelector } from 'react-redux';
import { selectAuth } from '~/app/features/auth/authSlice';

const cb = className.bind(style);

const MyChannel = () => {
  const auth = useSelector(selectAuth);
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));
  console.log(avatar);
  const [contents, setContents] = useState([]);
  const [user, setUser] = useState({});
  const extension = ['.mp4', '.mkv', '.mov'];
  const avatarURL = avatar ? `${BASE_URL}image/avatar/${avatar}` : avatar;

  const [changeAvatar, setChangeAvatar] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPrivate.get('mychannel');
        setContents(res.data.contents);
        setUser(res.data.user);
        const _avatar = res.data.user.avatar;
        if (_avatar) {
          setAvatar(_avatar);
          localStorage.setItem('avatar', _avatar);
        }
      } catch (error) {
        const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [submitted]);

  return (
    <div className={cb('channelContainer')}>
      <ToastContainer autoClose={2000} />
      {changeAvatar && (
        <ChangeAvatar
          onChangeAvatar={setChangeAvatar}
          toast={toast}
          setSubmitted={setSubmitted}
          avatarOld={avatarURL || auth}
        />
      )}
      <div className={cb('channelHeader')}>
        {user?.avatar ? (
          <Button
            circle
            outline
            centerIcon={<EditAvatarIcon />}
            onClick={() => setChangeAvatar(!changeAvatar)}
            className={cb('wrap', 'mr5')}
          >
            <img src={avatarURL} alt="" className={cb('avatar')} />
          </Button>
        ) : (
          <Button
            centerIcon={<EditAvatarIcon />}
            circle
            outline
            onClick={() => setChangeAvatar(!changeAvatar)}
            className={cb('wrap', 'mr5')}
          >
            <div className={cb('avatar')}>{auth?.username?.slice(0, 1).toUpperCase()}</div>
          </Button>
        )}
        {auth && (
          <div className={cb('innerHeader')}>
            <div className={cb('innerHeader-meta')}>
              <div className={cb('name')}>{user.username}</div>
              <p>{user.email}</p>
              <p>
                {contents?.length}&nbsp;{contents?.length > 1 ? 'videos' : 'video'}
              </p>
            </div>
            <div className={cb('innerHeader-btn')}>
              <Button primary>Customise channel</Button>
              <Button to={'/manage-my-videos'} primary>
                Manage videos
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="row">
        {contents.length > 0 ? (
          contents.map((content) => (
            <div className="col-sm-6 col-lg-4" key={content.id}>
              <div className={'cardYoutube card mt-4'}>
                <Link to={`watch/${content?.linkVideo}`}>
                  {content?.videoName && extension.some((ex) => content?.videoName.endsWith(ex)) ? (
                    <video
                      loading="lazy"
                      className="card-img-top"
                      src={`${BASE_URL}video/${content?.videoName}`}
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
                  <div className="mr-3">
                    {user?.avatar ? (
                      <img src={avatarURL} alt="" className="avatar" />
                    ) : (
                      <div className="avatar">{user?.channelName?.slice(0, 1).toUpperCase()}</div>
                    )}
                  </div>
                  <div className="inforBase">
                    <Link to={`watch/${content.linkVideo}`} className="card-title">
                      {content.title}
                    </Link>
                    <span className="text-viewCount">
                      {content?.view} view{content?.view > 1 && 's'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span className="text-center">No content.</span>
        )}
      </div>
    </div>
  );
};

export default MyChannel;
