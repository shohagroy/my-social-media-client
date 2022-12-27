import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContex } from "../Components/GobalAuthProvaider/GobalAuthProvaider";
import LoadingLoader from "../Shared/Loaders/LoadingLoader";

const PrivatePouter = ({ children }) => {
  const { user, loader } = useContext(AuthContex);

  const location = useLocation();

  if (loader) {
    return (
      <div className="flex justify-center items-center">
        <LoadingLoader />
      </div>
    );
  }

  if (!user.email) {
    return <Navigate to="/login" state={{ path: location }} replace></Navigate>;
  } else {
    return children;
  }
};

export default PrivatePouter;
