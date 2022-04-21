import React from "react";
import st from "./customSelect.module.scss";

const CustomSelect = ({ title, options, className, value, setValue }) => {
	console.log(+value, options);

	return (
		<div className={`${st.customSelect} ${className}`}>
			<p>{title}</p>
			<select onChange={(e) => setValue(e.target.value)}>
				{options.map((option) => (
					<option
						key={option.title}
						value={option.value}
						selected={+value === option.value ? "selected" : ""}
					>
						{option.title}
					</option>
				))}
			</select>
		</div>
	);
};

export default CustomSelect;
