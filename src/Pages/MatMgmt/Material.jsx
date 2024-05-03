import React from "react";
import { Outlet } from "react-router-dom";

const Material = () => {
  return (
    <div>
      Material Management
      <Outlet />
    </div>
  );
};

export default Material;
