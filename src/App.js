import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Sidebar from "./components/sidebar";
import st from "./app.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { SetAuth, SetLocalAuth } from "./store/auth";
import Loading from "./components/loading";
import Header from "./components/header";
import Login from "./pages/login";

function App() {
	const [loading, setLoading] = useState(true),
		[isOpen, setIsOpen] = useState(true),
		{ isAuth, isLocalAuth } = useSelector((state) => state.auth),
		dispatch = useDispatch();

	const Conf = () => {
		const conf = window.prompt("Введите пароль: ");
		if (conf === "12345678") {
			dispatch(SetLocalAuth(true));
			localStorage.setItem("isLocalAuth", true);
			setLoading(false);
		} else Conf();
	};

	useEffect(() => {
		if (localStorage.getItem("isLocalAuth")?.length) {
			if (localStorage.getItem("token")?.length) {
				dispatch(SetAuth(true, localStorage.getItem("token")));
			} else {
				setTimeout(() => {
					setLoading(false);
				}, 250);
				dispatch(SetLocalAuth(true));
			}
		} else Conf();
	}, []);

	if (loading && !isLocalAuth) return <Loading />;
	else if (isLocalAuth && !isAuth) return <Login />;

	return (
		<div className={st.home}>
			<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className={`${st.home__right} ${!isOpen ? st.home__right__unactive : null}`}>
				<Header setIsOpen={setIsOpen} />
				<AppRouter />
			</div>
		</div>
	);
}

export default App;
