import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/customInput";
import CustomSelect from "../../components/customSelect";
import CustomTable from "../../components/customTable";
import { del, edit, voice } from "../../components/icons";
import Loading from "../../components/loading";
import Pagination from "../../components/pagination";
import { wordsService } from "../../services/wordsService";
import st from "./words.module.scss";

const Words = () => {
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

	const getData = () => {
		setLoading(true);

		wordsService.get(`_page=${page}&_limit=${limit}&_sort=asc`).then((res) => {
			setData(res.data.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		getData();
	}, [page, limit]);

	const onSave = (e) => {
		e.preventDefault();

		const data = {
			name: e.target[0].value,
			markForMin: +e.target[1].value,
			mark: +e.target[2].value,
			accessMark: {
				min: +e.target[3].value,
				max: +e.target[4].value,
			},
			status: "active",
		};

		modal.type === "add"
			? wordsService
					.add(data)
					.then((res) => {
						setModal(defStateModal);
						getData();
					})
					.catch((e) => console.log(e))
			: wordsService
					.edit(modal.data._id, data)
					.then((res) => {
						setModal(defStateModal);
						getData();
					})
					.catch((e) => console.log(e));
	};

	const delItem = () => {
		wordsService.del(modal.delId).then((res) => {
			setModal((prev) => ({ ...prev, showDel: false }));

			getData();
		});
	};

	if (loading) return <Loading />;

	return (
		<div className={st.words}>
			<div className={st.words__manipulations}>
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
					className="me-3"
				/>
				<CustomButton
					title="Create"
					onClick={() => setModal((prev) => ({ ...prev, show: true }))}
				/>
			</div>
			<CustomTable
				table={
					<table>
						<thead>
							<tr>
								<th>id</th>
								<th>Image</th>
								<th>Name</th>
								<th className="text-center text-nowrap">Transcription</th>
								<th className="text-center text-nowrap">Voice</th>
								<th className="text-center text-nowrap">Translation RU</th>
								<th className="text-center text-nowrap">Translation UZ</th>
								<th className="text-center text-nowrap">Level</th>
								<th className="text-center text-nowrap">Description</th>
								<th className="text-center text-nowrap">Example</th>
								<th className="text-center text-nowrap">Example RU</th>
								<th className="text-center text-nowrap">Example UZ</th>
								<th className="text-center text-nowrap">Actions</th>
							</tr>
						</thead>
						<tbody>
							{data.words.map((item, i) => (
								<tr>
									<td>{(page - 1) * +limit + i + 1}</td>
									<td>
										<img src={item.image.url} />
									</td>
									<td>{item.name}</td>
									<td className="text-center">[{item.transcript}]</td>
									<td
										className="text-center"
										onClick={() => {
											let audio = new Audio(item.voice.url);
											audio.play();
										}}>
										{voice}
									</td>
									<td className="text-center">{item.translationRu}</td>
									<td className="text-center">{item.translationUz}</td>
									<td className="text-center">{item?.level?.name}</td>
									<td className="text-left">{item.description}</td>
									<td className="text-left">{item.example}</td>
									<td className="text-left">{item.exampleRu}</td>
									<td className="text-left">{item.exampleUz}</td>
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
					<Modal.Title>words {modal.type}</Modal.Title>
				</Modal.Header>
				<form onSubmit={onSave}>
					<Modal.Body>
						<CustomInput
							type="text"
							defVal={modal?.data?.name}
							title="Name:"
							placeholder="Beginer"
						/>
						<CustomInput
							type="number"
							defVal={modal?.data?.markForMin}
							title="Mark for 60sec:"
							placeholder="100"
						/>
						<CustomInput
							type="number"
							defVal={modal?.data?.mark}
							title="Mark:"
							placeholder="10"
						/>
						<CustomInput
							type="number"
							defVal={modal?.data?.accessMark?.min}
							title="Access mark min:"
							placeholder="0"
						/>
						<CustomInput
							type="number"
							defVal={modal?.data?.accessMark?.max}
							title="Access mark max:"
							placeholder="1999"
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

export default Words;
