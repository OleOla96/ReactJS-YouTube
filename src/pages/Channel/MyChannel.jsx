import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useContexts from '~/hooks/useContexts';
import ChangeAvatar from './ChangeAvatar';
import Button from '~/components/button/Button';
import { BASE_URL } from '~/common/axios';
import className from 'classnames/bind';
import style from './myChannel.module.scss';
import { EditAvatarIcon } from '~/components/icons';

const cb = className.bind(style);

const MyChannel = () => {
  const { auth, avatar, setAvatar } = useContexts();
  const [contents, setContents] = useState([]);
  const [user, setUser] = useState({});
  const avatarURL = avatar ? `${BASE_URL}image/avatar/${avatar}` : avatar;

  const [changeAvatar, setChangeAvatar] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPrivate.get('roles/user');
        setContents(res.data.contents);
        setUser(res.data.user);
        const _avatar = res.data.user.avatar;
        if (_avatar) {
          setAvatar(_avatar);
          localStorage.setItem('avatar', _avatar);
        }
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
            className="mr5"
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
              <Button primary className={cb('mr-2')}>
                Customise channel
              </Button>
              <Button to={'/managevideos'} primary>
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
                <Link to={`watch/${content.linkVideo}`}>
                  <img
                    className="card-img-top"
                    src={`https://i.ytimg.com/vi/${content.linkVideo}/maxresdefault.jpg`}
                    alt={content.title}
                  />
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
          <span className="text-center" style={{ width: '80%' }}>
            No content.
          </span>
        )}
      </div>
    </div>
  );
};

export default MyChannel;
