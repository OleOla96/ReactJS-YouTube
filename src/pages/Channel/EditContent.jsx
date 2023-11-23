import { useState, useEffect, memo } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Button from '~/components/button/Button';
import classname from 'classnames/bind';
import styles from './createEdit.module.scss';

const cb = classname.bind(styles);

const EditContent = ({ contentEdit, setEdit, setSubmitted, toast }) => {
  const axiosPrivate = useAxiosPrivate();
  const initialData = {
    id: contentEdit.id,
    title: contentEdit.title,
    videoName: contentEdit.videoName,
    description: contentEdit.description,
    published: contentEdit.published,
  };
  const [dataReq, setDataReq] = useState(initialData);
  const [stateContent, setStateContent] = useState(initialData.published);
  const [loading, setLoading] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);

  useEffect(() => {
    if ((dataReq.title && dataReq.videoName) || dataReq.title) setAllowSubmit(true);
    else setAllowSubmit(false);
  }, [dataReq.title, dataReq.videoName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataReq({ ...dataReq, [name]: value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...dataReq,
      stateContent,
    };
    try {
      const res = await axiosPrivate.patch('crud/editcontent', data);

      setLoading(false);
      setEdit(false);
      setSubmitted(true);
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
    <div className="backgroud-overlay">
      <form onSubmit={handleUpdate} className={cb('card-validate')}>
        <h2 className={cb('card-title', 'text-center')}>Edit Content</h2>
        <button className="btn-close" onClick={() => setEdit(false)}>
          &times;
        </button>
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
            <label htmlFor="videoName">Video Name</label>
            <input
              type="text"
              name="videoName"
              id="videoName"
              className={cb('form-input')}
              value={dataReq.videoName}
              onChange={handleInputChange}
              readOnly
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
              rows={'4'}
              cols={'50'}
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
            {loading && <span className="spinner-border spinner-border-sm"></span>}
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(EditContent);
