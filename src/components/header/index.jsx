import React from "react";
import { useSelector } from "react-redux";
import { burgerMenu } from "../icons";
import st from "./header.module.scss";

const Header = () => {
	const { location } = useSelector((state) => state.dashboard);

	return (
		<div className={st.header}>
			<span>{burgerMenu}</span>
			<h1>{location}</h1>
		</div>
	);
};

export default Header;
