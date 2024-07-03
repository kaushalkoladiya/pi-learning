import { USER_ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";

/**
 * @info: HOC to check if user is authenticated and has the correct role
 * @info: If user is not authenticated, redirect to login page
 * 
 * @param {string} role - role of the user
 * @param {string} path - path to redirect to
 * @param {Component} Component - component to render
 */

const authRoute = (role = USER_ROLES.USER, path = ROUTES.LOGIN) => (Component) => {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (isAuthenticated && userRole === role) {
    return <Component />;
  }

  window.location = path;
};

export default authRoute;