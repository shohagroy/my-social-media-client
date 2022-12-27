import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Shared/Header/Navigation";
import Leftside from "../Shared/LeftSide/Leftside";
import RightSide from "../Shared/RightSide/RightSide";

const MainLayout = () => {
  return (
    <div>
      <div className="fixed top-0 z-50 w-full">
        <Navigation />
      </div>
      <div className="flex mt-[8vh] justify-between">
        <div className="lg:w-[400px] fixed left-0 ">
          <Leftside />
        </div>
        <div className="lg:w-[700px] mx-auto">
          <Outlet />
        </div>
        <div className="lg:w-[400px] fixed right-0 text-right">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
