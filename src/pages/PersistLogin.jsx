import { Outlet } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import { useSelector } from 'react-redux';
import { selectAuth } from '~/app/features/auth/authSlice';
import useLocalStorage from '../hooks/useLocalStorage';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [persist] = useLocalStorage('persist', false);
  const auth = useSelector(selectAuth);
  const refresh = useRefreshToken();
  // console.log('persist: ', persist);
  useLayoutEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
        console.log('refresh');
      } catch (err) {
        console.error(err.message);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
