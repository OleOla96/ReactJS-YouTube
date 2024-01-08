import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import EditContent from './EditContent';
import style from './detailContent.module.scss';
import className from 'classnames/bind';
import Button from '~/components/button/Button';

const cb = className.bind(style);

export default function DetailContent() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [content, setContent] = useState({});
  const [contentEdit, setContentEdit] = useState({});
  const [edit, setEdit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosPrivate.get(`crud/mycontent/${id}`);
        setSubmitted(false);
        setContent(res.data);
      } catch (error) {
        setSubmitted(false);
        const err = error?.response?.data?.message || error?.response?.message || error?.message || error.toString();
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getData();
    // eslint-disable-next-line
  }, [submitted]);

  const handleDelete = async (id) => {
    if (window.confirm('You definitely want to delete?')) {
      try {
        const res = await axiosPrivate.delete(`crud/delete/${id}`);
        setSubmitted(true);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (error) {
        const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className={cb('head-infor')}>
        <div className={cb('left')}>
          <h1 className="display-4">{content.title}</h1>
          <div>
            <label htmlFor="linkVideo">Link video:&nbsp;</label>
            <span id="linkVideo" className="">
              {content.linkVideo}
            </span>
          </div>
          <div className="">
            {content.view} view{content.view > 1 ? 's' : ''} | {content.like} like{content.like > 1 ? 's' : ''} |{' '}
            {content.dislike} dislike{content.disLike > 1 ? 's' : ''}
          </div>
        </div>
        <div className={cb('right')}>
          <Button
            warning
            leftIcon={<i className="fa fa-edit" />}
            className=""
            onClick={() => {
              setEdit(true);
              setContentEdit(content);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            leftIcon={<i className="fa fa-trash-o" />}
            className=""
            onClick={() => handleDelete(content.id)}
          >
            Delete
          </Button>
        </div>
      </div>
      <hr className="my-4" />
      <p>{content.description ? content.description : 'No description.'}</p>
      <hr className="my-4" />
      <div>
        <label htmlFor="createdAt">Created at:&nbsp;</label>
        <span id="createdAt" className="">
          {moment(content.createdAt).format('HH:mm:ss ddd DD-MMM-YYYY')}
        </span>
      </div>
      <div>
        <label htmlFor="updatedAt">Update at:&nbsp;</label>
        <span id="updatedAt" className="">
          {moment(content.updatedAt).format('HH:mm:ss ddd DD-MMM-YYYY')}
        </span>
      </div>
      <Link className="btn btn-primary btn-lg" to="/manage-my-videos" role="button">
        <i className="fas fa-reply mr-3" />
        Back
      </Link>
      {edit && <EditContent contentEdit={contentEdit} toast={toast} setEdit={setEdit} setSubmitted={setSubmitted} />}
    </div>
  );
}
