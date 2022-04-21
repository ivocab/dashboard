import React from "react";
import st from "./customTable.module.scss";

const CustomTable = ({ table }) => {
	return <div className={st.customTable}>{table}</div>;
};

export default CustomTable;
