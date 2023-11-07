import axios from '../common/axios';
import useContexts from './useContexts';
import useLocalStorage  from './useLocalStorage';

const useRefreshToken = () => {
    const { setAuth } = useContexts()
    const username = useLocalStorage('user')[0]
    const refresh = async () => {
        const res = await axios.get('auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                accessToken: res.data.accessToken,
                username
            }
        })

        return res.data.accessToken;
    }
    
    return refresh;
};

export default useRefreshToken;
