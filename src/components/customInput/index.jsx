import React from "react";
import st from "./customInput.module.scss";

const CustomInput = ({ title, defVal, setVal, type, placeholder, className }) => {
	return (
		<table className={`${st.customInput} ${className}`}>
			<tr>
				<td>{title}</td>
				<td>
					<input
						type={type}
						defaultValue={defVal}
						placeholder={placeholder}
						onChange={(e) => setVal(e.target.value)}
					/>
				</td>
			</tr>
		</table>
	);
};

export default CustomInput;
