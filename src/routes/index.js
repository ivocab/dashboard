import React from "react";
import Home from "../pages/home";
import Levels from "../pages/levels";
import Users from "../pages/users";

export const RouteNames = {
	HOME: "/",
	LEVELS: "/levels",
	USERS: "/users",
};

export const routes = [
	{ path: RouteNames.HOME, element: Home },
	{ path: RouteNames.LEVELS, element: Levels },
	{ path: RouteNames.USERS, element: Users },
];
