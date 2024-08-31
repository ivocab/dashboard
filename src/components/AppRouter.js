import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { RouteNames } from "../routes";
import { adminRoutes } from "../routes/index.js";

const AppRouter = () => {
  const role = useSelector((state) => state.auth);

  console.log("role", role);

  return (
    <Routes>
      {adminRoutes.map((route) => (
        <Route path={route.path} key={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Navigate to={RouteNames.HOME} />} />
    </Routes>
  );
};

export default AppRouter;
