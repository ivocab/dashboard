import React, { FC } from "react";
import st from "./loading.module.scss";

const Loading = ({ isTable, isButton }) => {
	return (
		<div
			className={`${st.loading} ${isTable ? st.loading__table : ""} ${
				isButton ? st.loading__button : ""
			}`}>
			<div
				className="spinner-grow color-blue df_alc_jcb m-auto"
				style={
					isTable
						? { width: "30px", height: "30px" }
						: isButton
						? { width: "10px", height: "10px" }
						: { width: "50px", height: "50px" }
				}
				role="status">
				<span className="sr-only"></span>
			</div>
		</div>
	);
};

export default Loading;
