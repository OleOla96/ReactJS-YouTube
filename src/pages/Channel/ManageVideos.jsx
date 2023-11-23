import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './manageVideos.module.scss';
import classname from 'classnames/bind';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import EditContent from './EditContent';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const cb = classname.bind(style);

const ManageVideo = () => {
  const [submitted, setSubmitted] = useState(false);
  const [edit, setEdit] = useState(false);
  const [contents, setContents] = useState([]);
  const [contentEdit, setContentEdit] = useState({});
  const [checked, setChecked] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosPrivate.get('crud/mycontents');
        setContents(res.data);
        setSubmitted(false);
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

  const handleCheck = (id) => {
    setChecked((pre) => {
      const isChecked = pre.includes(id);
      if (isChecked) {
        return [...pre.filter((item) => item !== id)];
      } else {
        return [...pre, id];
      }
    });
  };

  const handleCheckAll = () => {
    if (checked.length === Object.keys(contents).length) {
      setChecked([]);
    } else {
      if (checked.length > 0) {
        const ids = [];
        const filterContent = contents.filter((item) => !checked.includes(item.id));
        filterContent.forEach((item) => ids.push(item.id));
        setChecked([...checked, ...ids]);
      } else {
        const ids = [];
        contents.forEach((item) => ids.push(item.id));
        setChecked(ids);
      }
    }
  };

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

  const handleSelectChange = (e) => {
    setSelectedAction(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('ids:', checked);
    if (selectedAction === 'delete')
      try {
        const res = await axiosPrivate.delete('crud/delete', { data: { ids: checked } });
        setSubmitted(true);
        setChecked([]);
        setSelectedAction('');
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (error) {
        const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
  };

  return (
    <div className="container mt5">
      <ToastContainer autoClose={2000} />
      <h1>My Contents</h1>
      <form className="form-inline" onSubmit={handleSubmit}>
        <select
          value={selectedAction}
          onChange={handleSelectChange}
          className="custom-select mr-sm-2"
          style={{ fontSize: '1.4rem' }}
          required="required"
          name="action"
        >
          <option value="">Option...</option>
          <option value="delete">Delete</option>
        </select>
        <button type="submit" className="btn btn-primary btn-sm" disabled={checked.length < 1}>
          Perform
        </button>
      </form>

      <table className="table mt5">
        <thead>
          <tr>
            <th scope="col">
              <input
                checked={Object.keys(contents).length && checked.length === Object.keys(contents).length}
                onChange={handleCheckAll}
                type="checkbox"
              />
            </th>
            <th scope="col">No.</th>
            <th scope="col">Title</th>
            <th scope="col">Publish</th>
            <th scope="col" colSpan="3"></th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(contents).length > 0 ? (
            contents.map((data, index) => (
              <tr key={data.id} className={cb('rowContent-center')}>
                <td>
                  <input checked={checked.includes(data.id)} onChange={() => handleCheck(data.id)} type="checkbox" />
                </td>
                <td>{++index}</td>
                <td>{data.title}</td>
                <td>{data.published ? 'Yes' : 'No'}</td>
                <td>
                  <Link to={`detail/${data.id}`} className="btn btn-link size-icon">
                    Detail
                  </Link>
                </td>
                <td>
                  <Tippy content="Edit" placement="right">
                    <button
                      className="btn btn-edit size-icon"
                      onClick={() => {
                        setEdit(true);
                        setContentEdit({
                          id: data.id,
                          title: data.title,
                          description: data.description,
                          linkVideo: data.linkVideo,
                          videoName: data.videoName,
                          published: data.published,
                        });
                      }}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                  </Tippy>
                </td>
                <td>
                  <Tippy content="Delete" placement="right">
                    <button className="btn-delete btn size-icon mb-0" onClick={() => handleDelete(data.id)}>
                      <span className="fa fa-trash-o"></span>
                    </button>
                  </Tippy>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                Empty !
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {edit && <EditContent contentEdit={contentEdit} toast={toast} setEdit={setEdit} setSubmitted={setSubmitted} />}
    </div>
  );
};

export default ManageVideo;
