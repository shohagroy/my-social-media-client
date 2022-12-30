import React from "react";
import { Outlet } from "react-router-dom";

const Leftside = () => {
  return (
    <div className="bg-blue-600 h-[90vh]">
      <Outlet />
    </div>
  );
};

export default Leftside;
