import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Auth from "./auth";
import Dashboard from "./dashboard";

const rootReducer = combineReducers({
	auth: Auth,
	dashboard: Dashboard,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
