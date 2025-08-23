import { LOGIN_ROUTE } from '@/constants/routes';
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log("USER LOGOUT=>",user);
  return (
    <>
      {user ?  <Outlet /> : <Navigate to={LOGIN_ROUTE}/>}
    </>
  );
};


export default AuthLayout;