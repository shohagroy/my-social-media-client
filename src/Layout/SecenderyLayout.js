import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Shared/Header/Navigation";

const SecenderyLayout = () => {
  return (
    <section>
      <Navigation />
      <Outlet />
    </section>
  );
};

export default SecenderyLayout;
