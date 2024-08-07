import React, { useEffect } from 'react';
import { USER_ROLES } from "@/constants/roles";
import { ROUTES, STUDENT_ROUTES } from "@/constants/routes";
import { usePathname, useRouter } from 'next/navigation';

function authMiddleware(Component) {
  return function isAuth(props) {
    const router = useRouter();
    const pathname = usePathname();
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace(ROUTES.HOME);
      }
    }, []);

    if (!isAuthenticated) return null;

    return <Component {...props} />;
  }
};

export default authMiddleware;