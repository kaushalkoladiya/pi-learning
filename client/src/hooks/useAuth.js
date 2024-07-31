import { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { USER_ROLES } from '@/constants/roles';
import { setUser as setUserSlice } from '@/redux/userSlice';
import { ROUTES } from '@/constants/routes';

const useAuth = () => {
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.user, shallowEqual);
  const router = useRouter();

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
  };
  
  const isUserStudent = () => {
    return authSlice.role === USER_ROLES.STUDENT;
  };

  const isUserInstructor = () => {
    return authSlice.role === USER_ROLES.INSTRUCTOR;
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    router.replace(ROUTES.HOME)
  };

  return {
    ...authSlice,
    isUserAdmin,
    logout,
    isUserStudent,
    isUserInstructor,
    isAuth: !!authSlice.token,
  };
}

export default useAuth