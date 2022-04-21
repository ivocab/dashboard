import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Sidebar from "./components/sidebar";
import st from "./app.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { SetAuth } from "./store/auth";
import Loading from "./components/loading";
import Header from "./components/header";

function App() {
	const [loading, setLoading] = useState(true),
		[isOpen, setIsOpen] = useState(true),
		{ isAuth } = useSelector((state) => state.auth),
		dispatch = useDispatch();

	const Conf = () => {
		const conf = window.prompt("Введите пароль: ");
		if (conf === "Acer9963*") {
			dispatch(SetAuth(true));
			localStorage.setItem("isAuth", true);
			setTimeout(() => {
				setLoading(false);
			}, 250);
		} else Conf();
	};

	useEffect(() => {
		if (localStorage.getItem("isAuth")?.length) {
			dispatch(SetAuth(true));
			setTimeout(() => {
				setLoading(false);
			}, 250);
		} else Conf();
	}, []);

	if (loading) return <Loading />;

	if (isAuth)
		return (
			<div className={st.home}>
				<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
				<div className={st.home__right}>
					<Header />
					<AppRouter />
				</div>
			</div>
		);
	return <AppRouter />;
}

export default App;
