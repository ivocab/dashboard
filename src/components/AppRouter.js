import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../routes/index.js";
import { RouteNames } from "../routes";

const AppRouter = () => {
	return (
		<Routes>
			{routes.map((route) => (
				<Route path={route.path} key={route.path} element={<route.element />} />
			))}
			<Route path="*" element={<Navigate to={RouteNames.HOME} />} />
		</Routes>
	);
};

export default AppRouter;
