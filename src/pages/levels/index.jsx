import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';
import CustomTable from '../../components/customTable';
import { del, edit } from '../../components/icons';
import Loading from '../../components/loading';
import Pagination from '../../components/pagination';
import { levelsService } from '../../services/levelsService';
import st from './levels.module.scss';

const Levels = () => {
	const [data, setData] = useState([]),
		[loading, setLoading] = useState(true),
		[page, setPage] = useState(1),
		[limit, setLimit] = useState(10),
		defStateModal = {
			show: false,
			showDel: false,
			type: 'add',
		},
		[modal, setModal] = useState(defStateModal);

	const getData = () => {
		setLoading(true);

		levelsService.get(`_page=${page}&_limit=${limit}&_sort=asc`).then((res) => {
			setData(res.data.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		getData();
	}, [page, limit]);

	const onSave = (e) => {
		e.preventDefault();

		const DATA = {
			name: e.target[0].value,
			markForMin: +e.target[1].value,
			mark: +e.target[2].value,
			accessMark: {
				min: +e.target[3].value,
				max: +e.target[4].value,
			},
			index: data?.levels?.length + 1,
		};

		console.log(DATA);

		modal.type === 'add'
			? levelsService
					.add(DATA)
					.then((res) => {
						setModal(defStateModal);
						getData();
					})
					.catch((e) => console.log(e))
			: levelsService
					.edit(modal.data._id, data)
					.then((res) => {
						setModal(defStateModal);
						getData();
					})
					.catch((e) => console.log(e));
	};

	const delItem = () => {
		levelsService.del(modal.delId).then((res) => {
			setModal((prev) => ({ ...prev, showDel: false }));

			getData();
		});
	};

	if (loading) return <Loading />;

	return (
		<div className={st.levels}>
			<div className={st.levels__manipulations}>
				<CustomSelect
					title="Limit:"
					options={[
						{
							title: '5',
							value: 5,
						},
						{
							title: '10',
							value: 10,
						},
						{
							title: '20',
							value: 20,
						},
					]}
					value={limit}
					setValue={setLimit}
					className="me-3"
				/>
				<CustomButton title="Create" onClick={() => setModal((prev) => ({ ...prev, show: true }))} />
			</div>
			<CustomTable
				table={
					<table>
						<thead>
							<tr>
								<th>id</th>
								<th>Name</th>
								<th className="text-center">Mark for 60sec.</th>
								<th className="text-center">Mark</th>
								<th className="text-center">Access mark</th>
								<th className="text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{data.levels.map((item, i) => (
								<tr>
									<td>{(page - 1) * +limit + i + 1}</td>
									<td className="text-nowrap">{item.name}</td>
									<td className="text-center text-nowrap">{item.markForMin}</td>
									<td className="text-center text-nowrap">{item.mark}</td>
									<td className="text-center text-nowrap">
										{item.accessMark.min}-{item.accessMark.max}
									</td>
									<td>
										<div>
											<span
												onClick={() =>
													setModal((prev) => ({
														...prev,
														show: true,
														type: 'edit',
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
					<Modal.Title>Levels {modal.type}</Modal.Title>
				</Modal.Header>
				<form onSubmit={onSave}>
					<Modal.Body>
						<CustomInput type="text" defVal={modal?.data?.name} title="Name:" placeholder="Beginer" />
						<CustomInput
							type="number"
							defVal={modal?.data?.markForMin}
							title="Mark for 60sec:"
							placeholder="100"
						/>
						<CustomInput type="number" defVal={modal?.data?.mark} title="Mark:" placeholder="10" />
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

export default Levels;
