import React from "react";
import Loading from "../loading";
import st from "./customButton.module.scss";

const CustomButton = ({ type, title, loading, className, btnType, onClick, onSubmit }) => {
	return (
		<button
			type={type}
			className={`${st.customButton} ${st[`customButton__${btnType}`]} ${className}`}
			onSubmit={onSubmit}
			onClick={onClick}>
			{title} {loading ? <Loading isButton={true} /> : null}
		</button>
	);
};

export default CustomButton;
