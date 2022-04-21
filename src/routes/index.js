import React from "react";
import Home from "../pages/home";
import Levels from "../pages/levels";

export const RouteNames = {
	HOME: "/",
	LEVELS: "/levels",
};

export const routes = [
	{ path: RouteNames.HOME, element: Home },
	{ path: RouteNames.LEVELS, element: Levels },
];
