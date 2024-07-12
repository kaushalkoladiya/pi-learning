import { USER_ROLES } from '@/constants/roles';
import { setUser as setUserSlice } from '@/redux/userSlice';
import { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const useAuth = () => {
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.user, shallowEqual);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (token && role) {
        dispatch(setUserSlice({ token, role }));
      }

    })();
  }, []);

  const isUserAdmin = () => {
    return authSlice.role === USER_ROLES.ADMIN;
  }

  return {
    ...authSlice,
    isUserAdmin,
  };
}

export default useAuth