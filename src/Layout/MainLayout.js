import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Shared/Header/Navigation";
import Leftside from "../Shared/LeftSide/Leftside";
import RightSide from "../Shared/RightSide/RightSide";

const MainLayout = () => {
  return (
    <div>
      <Navigation />
      <div className="flex justify-between">
        <div className="lg:w-[400px] ">
          <Leftside />
        </div>
        <div className="lg:w-[700px]">
          <Outlet />
        </div>
        <div className="lg:w-[400px] text-right">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
