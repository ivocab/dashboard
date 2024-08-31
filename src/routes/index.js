import Home from "../pages/home";
import Levels from "../pages/levels";
import Login from "../pages/login";
import Users from "../pages/users";
import User from "../pages/users/user";
import Words from "../pages/words";

export const RouteNames = {
  HOME: "/",
  LOGIN: "/login",
  LEVELS: "/levels",
  WORDS: "/words",
  USERS: "/users",
  USERID: "/users/:userId",
};

export const adminRoutes = [
  { path: RouteNames.HOME, element: Home },
  { path: RouteNames.LOGIN, element: Login },
  { path: RouteNames.LEVELS, element: Levels },
  { path: RouteNames.WORDS, element: Words },
  {
    path: RouteNames.USERS,
    element: Users,
  },
  { path: RouteNames.USERID, element: User },
];

export const routes = [
  { path: RouteNames.HOME, element: Home },
  { path: RouteNames.LOGIN, element: Login },
  { path: RouteNames.LEVELS, element: Levels },
  { path: RouteNames.WORDS, element: Words },
  {
    path: RouteNames.USERS,
    element: Users,
  },
  { path: RouteNames.USERID, element: User },
];
