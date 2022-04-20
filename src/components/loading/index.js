import React, { FC } from "react";
import st from "./loading.module.scss";

const Loading = ({ isTable }) => {
	return (
		<div className={`${st.loading} ${isTable ? st.loading__table : ""}`}>
			<div
				className='spinner-grow color-blue df_alc_jcb m-auto'
				style={isTable ? { width: "30px", height: "30px" } : { width: "50px", height: "50px" }}
				role='status'
			>
				<span className='sr-only'></span>
			</div>
		</div>
	);
};

export default Loading;
