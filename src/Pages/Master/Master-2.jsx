import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function isLogged(user) {
  if (user === "Ritesh") {
    return (
      <>
        Master
        <button onClick={handleC}>C</button>
        <Outlet />
      </>
    );
  } else {
    return <h2>Access Denied</h2>;
  }
}

export default function Master() {
  const { auth, setAuth } = useAuth();
  console.log("++++++++++++++++++++");
  console.log(auth);
  console.log("++++++++++++++++++++++++++");
  const handleC = () => {
    setAuth({
      user: "Kej",
      pwd: "89",
    });
  };

  {
    isLogged(auth.user);
  }
}
