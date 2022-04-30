import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/customInput";
import CustomSelect from "../../components/customSelect";
import CustomTable from "../../components/customTable";
import { del, edit } from "../../components/icons";
import Loading from "../../components/loading";
import Pagination from "../../components/pagination";
import { usersService } from "../../services/usersService";
import { BeautyFullTime, JamesSort } from "../../utils";
import st from "./users.module.scss";

const Users = () => {
	const [data, setData] = useState([]),
		[loading, setLoading] = useState(true),
		[page, setPage] = useState(1),
		[limit, setLimit] = useState(10),
		defStateModal = {
			show: false,
			showDel: false,
			type: "add",
		},
		[modal, setModal] = useState(defStateModal);

	// const getData = () => {
	// 	setLoading(true);
	// };

	useEffect(() => {
		setLoading(true);
		usersService.get(`_page=1&_limit=100000000&_sort=asc`).then((res) => {
			console.log(JamesSort(res.data.data.users));
			setData(res.data.data);
			setLoading(false);
		});
	}, []);

	// useEffect(() => {
	// 	getData();
	// }, [page, limit]);

	const onSave = (e) => {
		e.preventDefault();

		const data = {
			status: e.target[0].value,
		};

		// usersService
		// 	.edit(modal.data._id, data)
		// 	.then((res) => {
		// 		setModal(defStateModal);
		// 		getData();
		// 	})
		// 	.catch((e) => console.log(e));
	};

	const delItem = () => {
		usersService.del(modal.delId).then((res) => {
			setModal((prev) => ({ ...prev, showDel: false }));

			// getData();
		});
	};

	if (loading) return <Loading />;

	return (
		<div className={st.users}>
			<div className={st.users__manipulations}>
				<CustomSelect
					title="Limit:"
					options={[
						{
							title: "5",
							value: 5,
						},
						{
							title: "10",
							value: 10,
						},
						{
							title: "20",
							value: 20,
						},
					]}
					value={limit}
					setValue={setLimit}
				/>
			</div>
			<CustomTable
				table={
					<table>
						<thead>
							<tr>
								<th>id</th>
								<th>Name</th>
								<th className="text-center">Level</th>
								<th className="text-center">Lang</th>
								<th className="text-center">Mark</th>
								<th className="text-center">Place</th>
								<th className="text-center">Last visit</th>
								<th className="text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{data.users.map((item, i) => (
								<tr>
									<td>{(page - 1) * +limit + i + 1}</td>
									<td>{item.name}</td>
									<td className="text-center">{item.level}</td>
									<td className="text-center">{item.language}</td>
									<td className="text-center">{item.score}</td>
									<td className="text-center">{/*item.score*/} place</td>
									<td className="text-center">
										{BeautyFullTime(item.updatedAt)}
									</td>
									<td>
										<div>
											<span
												onClick={() =>
													setModal((prev) => ({
														...prev,
														show: true,
														type: "edit",
														data: item,
													}))
												}>
												{edit}
											</span>
											<span
												onClick={() =>
													setModal((prev) => ({
														...prev,
														showDel: true,
														delId: item._id,
													}))
												}>
												{del}
											</span>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				}
			/>

			<Pagination page={page} limit={limit} total={data.total} setPage={setPage} />

			<Modal show={modal.show} onHide={() => setModal(defStateModal)}>
				<Modal.Header closeButton>
					<Modal.Title>User {modal.type}</Modal.Title>
				</Modal.Header>
				<form onSubmit={onSave}>
					<Modal.Body>
						<CustomSelect
							title="Status"
							options={[
								{
									title: "Active",
									value: "active",
								},
								{
									title: "Unactive",
									value: "unactive",
								},
							]}
							value={modal?.data?.status}
						/>
					</Modal.Body>
					<Modal.Footer>
						<CustomButton
							type="button"
							title="Cancel"
							btnType="cancel"
							onClick={() => setModal(defStateModal)}
						/>
						<CustomButton type="submit" title="Save" />
					</Modal.Footer>
				</form>
			</Modal>

			<Modal show={modal.showDel} onHide={() => setModal(defStateModal)}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>

				<Modal.Footer>
					<CustomButton
						type="button"
						title="Cancel"
						btnType="cancel"
						onClick={() => setModal(defStateModal)}
					/>
					<CustomButton type="button" title="Delete" btnType="delete" onClick={delItem} />
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Users;
