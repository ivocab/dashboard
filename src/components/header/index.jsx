import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { burgerMenu } from "../icons";
import st from "./header.module.scss";

const Header = () => {
	const [location, setLocation] = useState(""),
		navigate = useLocation();

	useEffect(() => {
		setLocation(navigate.pathname.slice(1).toLocaleUpperCase());
	}, [navigate]);

	return (
		<div className={st.header}>
			<span>{burgerMenu}</span>
			<h1>{location}</h1>
		</div>
	);
};

export default Header;
