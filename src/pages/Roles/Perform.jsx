import { useState } from 'react';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import className from 'classnames/bind';
import style from './menuSelect.module.scss';

const cb = className.bind(style);

export default function Perform({ setSubmitted, toast }) {
  const axiosPrivate = useAxiosPrivate();
  const [checked, setChecked] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');

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
      } catch (error) {
        const err = error?.response?.data?.message || error.response.message || error.message || error.toString();
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
  };

  return (
    <div className={cb('wrap')}>
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
          <option value="delete">Delete</option>
        </select>
        <button type="submit" className="btn btn-primary btn-sm" disabled={checked.length < 1}>
          Perform
        </button>
      </form>
    </div>
  );
}
