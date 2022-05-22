import React from "react";
import st from "./customSelect.module.scss";

const CustomSelect = ({ title, options, className, value, setValue }) => {
	return (
		<div className={`${st.customSelect} ${className}`}>
			<p>{title}</p>
			<select onChange={(e) => (setValue ? setValue(e.target.value) : null)}>
				{options.map((option) => (
					<option
						key={option.title}
						value={option.value}
						selected={value == option.value ? "selected" : ""}>
						{option.title}
					</option>
				))}
			</select>
		</div>
	);
};

export default CustomSelect;
