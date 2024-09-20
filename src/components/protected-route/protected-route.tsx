import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { Preloader } from '@ui';
import { isUserAuthCheckedSelector } from '../../services/slices/user/user-auth-slice';
import { userSelector } from '../../services/slices/user/user-auth-slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(userSelector);
  const location = useLocation();
  const userAuthHandler = useSelector(isUserAuthCheckedSelector);

  if (!userAuthHandler) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
