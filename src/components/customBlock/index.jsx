import React from "react";
import st from "./customBlock.module.scss";

const CustomBlock = ({ title }) => {
	return (
		<div className={st.customBlock}>
			<h4>{title}</h4>
		</div>
	);
};

export default CustomBlock;
