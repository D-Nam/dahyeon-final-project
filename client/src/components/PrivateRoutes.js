import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const PrivateRoutes = () => {
  const { signedInUser_id } = useContext(UserContext);
  const currentLocation = useLocation();
  return (
    <>
      {signedInUser_id ? (
        <Outlet />
      ) : (
        <Navigate
          to={'/signIn'}
          replace
          state={{ redirectedFrom: currentLocation }}
        />
      )}
    </>
  );
};

export default PrivateRoutes;
