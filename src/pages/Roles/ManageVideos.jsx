import { useState, useEffect } from 'react';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

function ManageContents() {
  const [content, setContent] = useState('');
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get('roles/moderator').then(
      (res) => {
        setContent(res.data);
      },
      (error) => {
        setContent(
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString(),
        );
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
}

export default ManageContents;
