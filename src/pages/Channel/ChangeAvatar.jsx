import { useState, useEffect, memo } from 'react';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import classname from 'classnames/bind';
import styles from './myChannel.module.scss';
import Button from '~/components/button/Button';

const cb = classname.bind(styles);

const ChangeAvatar = ({ onChangeAvatar, setSubmitted, toast, avatarOld }) => {
  const axiosPrivate = useAxiosPrivate();
  const [file, setFile] = useState();
  const [avatarPr, setAvatar] = useState();
  const [loading, setLoading] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);

  useEffect(() => {
    if (file) {
      setAllowSubmit(true);
    } else setAllowSubmit(false);

    return () => {
      avatarPr && URL.revokeObjectURL(avatarPr.preview);
    };
  }, [avatarPr, file]);

  const handlePreviewAvatar = (e) => {
    const _file = e.target.files[0];
    setFile(_file);
    setAvatar(URL.createObjectURL(_file));
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
        {avatarPr ? (
          <div className={cb('wrap', 'mb-4')}>
            <img src={avatarPr} alt="" className={cb('avatar')} />
          </div>
        ) : (
          <div className={cb('wrap', 'mb-4')}>
            {avatarOld?.username ? (
              <div className={cb('avatar')}>{avatarOld?.username.slice(0, 1).toUpperCase()}</div>
            ) : (
              <img src={avatarOld} alt="" className={cb('avatar')} />
            )}
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
        <div className="form-group text-center">
          <Button rounded submit disabled={!allowSubmit || loading} className={'mx-auto'}>
            {loading && <span className="spinner-border spinner-border-sm"></span>}
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(ChangeAvatar);
