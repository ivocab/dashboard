import React from "react";
import st from "./customButton.module.scss";

const CustomButton = ({ type, title, className, btnType, onClick, onSubmit }) => {
	return (
		<button
			type={type}
			className={`${st.customButton} ${st[`customButton__${btnType}`]} ${className}`}
			onSubmit={onSubmit}
			onClick={onClick}
		>
			{title}
		</button>
	);
};

export default CustomButton;
