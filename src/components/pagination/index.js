import React from "react";
import { chevron } from "../icons";
import st from "./pagination.module.scss";

const Pagination = ({ page, limit, total, setPage }) => {
	return (
		<div className={st.pagination}>
			<p>
				{page} of {Math.ceil(total / limit)}
			</p>
			<span onClick={() => (page !== 1 ? setPage(page - 1) : null)}>{chevron}</span>
			<span onClick={() => (page !== Math.ceil(total / limit) ? setPage(page + 1) : null)}>{chevron}</span>
		</div>
	);
};

export default Pagination;
