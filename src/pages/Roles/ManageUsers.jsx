import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import className from 'classnames/bind';
import style from './manageUsers.module.scss';
import MenuSelect from './MenuSelect';
import ReactPaginate from 'react-paginate';

const cb = className.bind(style);

function ManageUsers() {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');
  // console.log('out');
  useEffect(() => {
    getData(page);
    // eslint-disable-next-line
  }, [submitted]);

  const getData = async (p) => {
    try {
      const res = await axiosPrivate.get(`roles/admin/?page=${p}`);
      setData(res.data.contents);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      // console.log(res);
      setSubmitted(false);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      setSubmitted(false);
      const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

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
    if (checked.length === Object.keys(data).length) {
      setChecked([]);
    } else {
      if (checked.length > 0) {
        const ids = [];
        const filterContent = data.filter((item) => !checked.includes(item.id));
        filterContent.forEach((item) => ids.push(item.id));
        setChecked([...checked, ...ids]);
      } else {
        const ids = [];
        data.forEach((item) => ids.push(item.id));
        setChecked(ids);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('You definitely want to delete?')) {
      try {
        const res = await axiosPrivate.delete(`roles/admin/delete/${id}`);
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
    if (selectedAction === 'delete')
      try {
        const res = await axiosPrivate.delete('roles/admin/delete', { data: { ids: checked } });
        setSubmitted(true);
        setChecked([]);
        setSelectedAction('');
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      } catch (error) {
        const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
    if (selectedAction === 'update')
      try {
        const filterUser = data.filter((user) => checked.includes(user.id));
        const dataReq = [];
        filterUser.forEach((user) => {
          const infor = {
            id: user.id,
            roles: user.roles[0].name,
          };
          dataReq.push(infor);
        });
        const res = await axiosPrivate.patch('roles/admin/set-role', dataReq);
        setSubmitted(true);
        setChecked([]);
        setSelectedAction('');
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      } catch (error) {
        const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
  };

  const handlePageClick = (e) => {
    const newOffset = e.selected + 1;
    console.log(`User requested page number ${e.selected}, which is offset ${newOffset}`);
    getData(newOffset);
  };

  return (
    <div className="container mt5">
      <ToastContainer autoClose={2000} />
      <h1 className="text-center">List user</h1>
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
          <option value="update">Update</option>
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
                checked={data.length && checked.length === data.length}
                onChange={handleCheckAll}
                type="checkbox"
              />
            </th>
            <th scope="col">No.</th>
            <th scope="col">User Name</th>
            <th scope="col">Roles</th>
            <th scope="col" colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <input checked={checked.includes(item.id)} onChange={() => handleCheck(item.id)} type="checkbox" />
                </td>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>
                  <div className={cb('field-role')}>{item.roles.map((role) => role.name).join(', ')}</div>
                  <MenuSelect data={data} setData={setData} index={index} />
                </td>
                <td>
                  <Link to={`user/detail/${item.id}`} className="btn btn-link size-icon">
                    Detail
                  </Link>
                </td>
                <td>
                  <button className="btn-delete size-icon btn" onClick={() => handleDelete(item.id)}>
                    <span className="fa fa-trash-o"></span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                Empty !
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
}

export default ManageUsers;
