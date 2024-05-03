import React from "react";
import { Outlet } from "react-router-dom";

const Money = () => {
  return (
    <div>
      Money
      <Outlet />
    </div>
  );
};

export default Money;
