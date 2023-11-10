import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import className from 'classnames/bind';
import styles from './createEdit.module.scss';
import Button from '~/components/button/Button';

const cb = className.bind(styles);

const UploadContent = () => {
  const axiosPrivate = useAxiosPrivate();
  const initialData = {
    title: '',
    description: '',
  };
  const [dataReq, setDataReq] = useState(initialData);
  const [stateContent, setStateContent] = useState(false);
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (dataReq.title && video) {
      console.log('here');
      setSubmit(true);
    } else setSubmit(false);
  }, [dataReq.title, video]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataReq({ ...dataReq, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', dataReq.title);
    formData.append('description', dataReq.description);
    formData.append('stateContent', stateContent);

    try {
      const res = await axiosPrivate.put('crud/upload', formData);
      setLoading(false);
      setDataReq(initialData);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      setLoading(false);
      const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <form onSubmit={handleSubmit} className={cb('card-validate')}>
        <h2 className={cb('card-title', 'text-center')}>Upload Content</h2>
        <div className="form-row">
          <div className="col-md-12 mb-3">
            <label htmlFor="title">Title</label>
            <input
              autoFocus
              type="text"
              name="title"
              id="title"
              className={cb('form-input')}
              value={dataReq.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <input
              type="file"
              name="video"
              id="video"
              className="form-control-file"
              onChange={(e) => setVideo(e.target.files[0])}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              className={cb('form-textarena')}
              value={dataReq.description}
              onChange={handleInputChange}
              rows="4"
              cols="60"
            />
          </div>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            id="state"
            className="form-check-input"
            checked={stateContent}
            onChange={() => setStateContent(!stateContent)}
          />
          <label htmlFor="state" className="ml-2">
            Public
          </label>
        </div>
        <div className="col-md-6 mx-auto">
          <Button rounded submit className={cb('btn-round')} disabled={!submit || loading}>
            {loading && <span className="spinner-border spinner-border-sm"></span>}
            Upload
          </Button>
        </div>
      </form>
    </>
  );
};

export default UploadContent;
