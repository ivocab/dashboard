import React from "react";
import Home from "../pages/home";
import Levels from "../pages/levels";
import Login from "../pages/login";
import Users from "../pages/users";

export const RouteNames = {
	HOME: "/",
	LOGIN: "/login",
	LEVELS: "/levels",
	USERS: "/users",
};

export const routes = [
	{ path: RouteNames.HOME, element: Home },
	{ path: RouteNames.LOGIN, element: Login },
	{ path: RouteNames.LEVELS, element: Levels },
	{ path: RouteNames.USERS, element: Users },
];
