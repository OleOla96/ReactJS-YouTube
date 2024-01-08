import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Button from '~/components/button/Button';
import className from 'classnames/bind';
import styles from './createEdit.module.scss';

const cb = className.bind(styles);

const CreateContent = () => {
  const axiosPrivate = useAxiosPrivate();
  const initialData = {
    title: '',
    description: '',
    linkVideo: '',
  };
  const [dataReq, setDataReq] = useState(initialData);
  const [stateContent, setStateContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);

  useEffect(() => {
    if (dataReq.title && dataReq.linkVideo) setAllowSubmit(true);
    else setAllowSubmit(false);
  }, [dataReq.title, dataReq.linkVideo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataReq({ ...dataReq, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      title: dataReq.title,
      description: dataReq.description,
      linkVideo: dataReq.linkVideo,
      stateContent,
    };

    try {
      const res = await axiosPrivate.put('crud/create', data);
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
        <h2 className={cb('card-title', 'text-center')}>Create Content</h2>
        <div className="form-row">
          <div className="col-md-6 mb-3">
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
          <div className="col-md-6 mb-3">
            <label htmlFor="linkVideo">Link Video</label>
            <input
              type="text"
              name="linkVideo"
              id="linkVideo"
              className={cb('form-input')}
              value={dataReq.linkVideo}
              onChange={handleInputChange}
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
          <Button rounded submit className={cb('btn-round')} disabled={!allowSubmit || loading}>
            {loading && <i style={{ lineHeight: 'inherit' }} className="fas fa-spinner fa-pulse mr-3" />}
            Create
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateContent;
