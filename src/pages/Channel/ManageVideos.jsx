import { useState, useLayoutEffect } from 'react';
import style from './manageVideos.module.scss';
import classname from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import EditContent from './EditContent';

const cb = classname.bind(style);

const ManageVideo = () => {
  const [submitted, setSubmitted] = useState(false);
  const [edit, setEdit] = useState(false);
  const [contents, setContents] = useState([]);
  const [contentEdit, setContentEdit] = useState({});
  const axiosPrivate = useAxiosPrivate();
  console.log('ManageVideo');

  useLayoutEffect(() => {
    axiosPrivate
      .get('crud/mycontents')
      .then((res) => {
        if (res?.data?.length > 0) {
          setContents(res.data);
          setSubmitted(false);
        }
      })
      .catch((error) => {
        setSubmitted(false);
        const err = error?.response?.data?.message || error?.response?.message || error?.message || error.toString();
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    // eslint-disable-next-line
  }, [submitted]);

  const handleDelete = (id) => {
    if (window.confirm('You definitely want to delete?')) {
      axiosPrivate
        .delete(`crud/delete/${id}`)
        .then((res) => {
          setSubmitted(true);
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((error) => {
          const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
          toast.error(err, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };

  return (
    <div className="container mt5">
      <ToastContainer autoClose={2000} />
      <h1>My Contents</h1>
      <table className="table mt5">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Title</th>
            <th scope="col">Link Video</th>
            <th scope="col">Publish</th>
            <th scope="col" colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          {contents.map((data, index) => (
            <tr key={data.id} className={cb('rowContent-center')}>
              <td>{++index}</td>
              <td>{data.title}</td>
              <td>{data.linkVideo}</td>
              <td>{data.published ? 'Yes' : 'No'}</td>
              <td>
                <button
                  className="btn btn-link size-icon"
                  onClick={() => {
                    setEdit(true);
                    setContentEdit({
                      id: data.id,
                      title: data.title,
                      description: data.description,
                      linkVideo: data.linkVideo,
                      stateContent: data.published,
                    });
                  }}
                >
                  <i className="fa fa-edit"></i>
                </button>
              </td>
              <td>
                <button className={cb('button-delete', 'size-icon mb0')} onClick={() => handleDelete(data.id)}>
                  <span className="fa fa-trash-o"></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {edit && <EditContent contentEdit={contentEdit} toast={toast} setEdit={setEdit} setSubmitted={setSubmitted} />}
    </div>
  );
};

export default ManageVideo;
