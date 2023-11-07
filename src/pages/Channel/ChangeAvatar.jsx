import { useState, useEffect, memo } from 'react';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import classname from 'classnames/bind';
import styles from './myChannel.module.scss';
import Button from '~/components/button/Button';

const cb = classname.bind(styles);

const ChangeAvatar = ({ onChangeAvatar, setSubmitted, toast, auth }) => {
  const axiosPrivate = useAxiosPrivate();
  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState({});
  const [loading, setLoading] = useState(false);
  const [_submit, setSubmit] = useState(false);
  // console.log(avatar);

  useEffect(() => {
    if (file) {
      setSubmit(true);
    } else setSubmit(false);

    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar, file]);

  const handlePreviewAvatar = (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files[0];
    console.log(file);
    setAvatar(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const res = await axiosPrivate.put('myChannel/editAvatar', formData);
      if (res) {
        setLoading(false);
        onChangeAvatar(false);
        setSubmitted(true);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      setLoading(false);
      const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="backgroud-overlay">
      <form onSubmit={handleUpdate} className={cb('card-validate')} encType="multipart/form-data">
        <h2 className={cb('card-title', 'text-center')}>Change Avatar</h2>
        <button className="btn-close" onClick={() => onChangeAvatar(false)}>
          &times;
        </button>
        {avatar ? (
          <div className={cb('wrap')}>
            <img src={avatar} alt="avatar" className={cb('avatar')} />
          </div>
        ) : (
          <div className={cb('wrap')}>
            <div className={cb('avatar')}>{auth?.username.slice(0, 1).toUpperCase()}</div>
          </div>
        )}
        <div className="form-group my-4 mx-auto">
          <input
            autoFocus
            type="file"
            name="avatar"
            id="avatar"
            className="form-control-file"
            onChange={handlePreviewAvatar}
            required
          />
        </div>
        <div className="form-group mx-auto">
          <Button rounded submit disabled={!_submit || loading} className={'mx-auto'}>
            {loading && <span className="spinner-border spinner-border-sm"></span>}
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(ChangeAvatar);
