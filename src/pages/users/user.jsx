import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/customInput";
import CustomSelect from "../../components/customSelect";
import CustomTable from "../../components/customTable";
import { del, edit } from "../../components/icons";
import Loading from "../../components/loading";
import Pagination from "../../components/pagination";
import { usersService } from "../../services/usersService";
import st from "./users.module.scss";
import defaultUser from "../../img/default-user.png";
import { BeautyFullTime } from "../../utils";

const User = () => {
	const [data, setData] = useState([]),
		[loading, setLoading] = useState(true),
		navigate = useNavigate(),
		router = useParams();

	const getData = () => {
		setLoading(true);

		usersService.getId(router.userId).then((res) => {
			setData(res.data.data.user);
			setLoading(false);
		});
	};

	useEffect(() => {
		getData();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className={st.user}>
			<div className={st.user__header}>
				<div className={st.user__header__info}>
					<img src={data?.img ? data.img : defaultUser} />
					<div>
						<h2>{data.name}</h2>
						{data?.username ? <h4>{data.username}</h4> : null}
					</div>
				</div>
				<CustomButton title="Back" onClick={() => navigate("/users")} />
			</div>
			<CustomTable
				table={
					<table>
						<tr>
							<th>Score</th>
							<td>{data.score}</td>
						</tr>
						<tr>
							<th>Level</th>
							<td>{data.level}</td>
						</tr>
						<tr>
							<th>Learned Words</th>
							<td>{data.learnedWords}</td>
						</tr>
						<tr>
							<th>Attemped Words</th>
							<td>{data.attemptedWords}</td>
						</tr>
						<tr>
							<th>Found Words</th>
							<td>{data.foundWords}</td>
						</tr>
						<tr>
							<th>Language</th>
							<td>{data.language}</td>
						</tr>

						<tr>
							<th>Status</th>
							<td>{data.status}</td>
						</tr>
						<tr>
							<th>Created</th>
							<td>{BeautyFullTime(data.createdAt)}</td>
						</tr>
						<tr>
							<th>Last visit</th>
							<td>{BeautyFullTime(data.updatedAt)}</td>
						</tr>
						<tr>
							<th>Used words</th>
							<td>{data.usedWords[0]}</td>
						</tr>
					</table>
				}
			/>
		</div>
	);
};

export default User;
