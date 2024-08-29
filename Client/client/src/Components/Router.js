import { createBrowserRouter as Router, Navigate, Outlet } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import WeatherPage from './WeatherComponent';
import HourlyPage from './HourlyDetails';
import LandingPage from './LandingPage';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const isAuthenticated = () => !!getCookie('token');

const PrivateRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/signup" replace />;
  }
  return <Outlet />;
};

const router = Router([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/weather",
        element: <WeatherPage />,
      },
      {
        path: "/hourly",
        element: <HourlyPage />,
      },
    ],
  },
]);

export default router;