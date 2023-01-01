import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Shared/Header/Navigation";

const SecenderyLayout = () => {
  return (
    <section>
      <div className="relative h-[8vh]  w-full z-50">
        <div className="fixed  w-full">
          <Navigation />
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default SecenderyLayout;
