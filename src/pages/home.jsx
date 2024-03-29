import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/customButton";
import CustomInput from "../components/customInput";
import CustomSelect from "../components/customSelect";
import CustomTable from "../components/customTable";
import { del, edit } from "../components/icons";
import Loading from "../components/loading";
import Pagination from "../components/pagination";
import { usersService } from "../services/usersService";
import { BeautyFullDay, BeautyFullTime, DelToken, GeneralSort } from "../utils";
import st from "./home.module.scss";

import Chart from "../components/chart";

const Home = () => {
	const [data, setData] = useState([]),
		[defData, setDefData] = useState([]),
		[chartData, setChartData] = useState([]),
		[loading, setLoading] = useState(true),
		[load, setLoad] = useState(true),
		[sort, setSort] = useState("last-5"),
		[today, setToday] = useState(new Date()),
		defStateModal = {
			show: false,
			showDel: false,
			type: "add",
		};

	const getData = () => {
		setLoading(true);
		usersService.get(`_page=1&_limit=100000000&_sort=asc`).then((res) => {
			setDefData(res.data.data);
			const data = GeneralSort(res.data.data.users, "last");

			setData(data);
			setLoading(false);
		});
		// .catch((e) => DelToken(navigate, dispatch));
	};

	const calculatePeriod = (data, lastTime, afterTime) => {
		const now = afterTime ? afterTime : today,
			last = new Date(today - lastTime);

		const temp = data.filter((item) => item.lastVisit >= last && item.lastVisit <= now);

		return { data: temp, count: temp.length };
	};

	useEffect(() => {
		if (chartData?.data?.length) setLoad(false);
	}, [chartData]);

	useEffect(() => {
		if (data?.length) {
			const g = setInterval(() => {
				setToday(new Date());
			}, 1000);
		}
	}, [data]);

	useEffect(() => {
		setLoad(true);
		switch (sort) {
			case "last-5": {
				const last5 = calculatePeriod(data, 300000).data;

				setChartData({
					period: last5,
					data: [
						{
							category: `${BeautyFullDay(new Date(today - 300000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 241000)).slice(11)}`,
							value: calculatePeriod(last5, 300000, new Date(today - 241000)).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 240000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 181000)).slice(11)}`,
							value: calculatePeriod(last5, 240000, new Date(today - 181000)).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 180000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 121000)).slice(11)}`,
							value: calculatePeriod(last5, 180000, new Date(today - 121000)).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 120000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 61000)).slice(11)}`,
							value: calculatePeriod(last5, 120000, new Date(today - 61000)).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 60000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today)).slice(11)}`,
							value: calculatePeriod(last5, 60000, today).count,
						},
					],
					count: last5.length,
				});
				break;
			}
			case "last-10": {
				const last10 = calculatePeriod(data, 600000).data;

				setChartData({
					period: last10,
					data: [
						{
							category: `${BeautyFullDay(new Date(today - 600000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 481000)).slice(11)}`,
							value: calculatePeriod(last10, 600000, new Date(today - 481000)).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 480000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 361000)).slice(11)}`,
							value: calculatePeriod(last10, 480000, new Date(today - 361000)).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 360000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 241000)).slice(11)}`,
							value: calculatePeriod(last10, 360000, new Date(today - 241000)).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 240000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 121000)).slice(11)}`,
							value: calculatePeriod(last10, 240000, new Date(today - 121000)).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 120000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today)).slice(11)}`,
							value: calculatePeriod(last10, 120000, today).count,
						},
					],
					count: last10.length,
				});
				break;
			}
			case "last-30": {
				const last30 = calculatePeriod(data, 1800000).data;

				setChartData({
					period: last30,
					data: [
						{
							category: `${BeautyFullDay(new Date(today - 1800000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 1501000)).slice(11)}`,
							value: calculatePeriod(last30, 1800000, new Date(today - 1501000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 1500000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 1201000)).slice(11)}`,
							value: calculatePeriod(last30, 1500000, new Date(today - 1201000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 1200000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 601000)).slice(11)}`,
							value: calculatePeriod(last30, 1200000, new Date(today - 601000)).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 900000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 601000)).slice(11)}`,
							value: calculatePeriod(last30, 900000, new Date(today - 601000)).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 600000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today - 301000)).slice(11)}`,
							value: calculatePeriod(last30, 600000, new Date(today - 301000)).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 300000)).slice(
								11
							)} - ${BeautyFullDay(new Date(today)).slice(11)}`,
							value: calculatePeriod(last30, 300000, today).count,
						},
					],
					count: last30.length,
				});
				break;
			}
			case "last-day": {
				const lastday = calculatePeriod(data, 86400000).data;

				setChartData({
					period: lastday,
					data: [
						{
							category: `${BeautyFullDay(new Date(today - 86400000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 79201000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 86400000, new Date(today - 79201000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 79200000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 72001000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 79200000, new Date(today - 72001000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 72000000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 64801000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 72000000, new Date(today - 64801000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 64800000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 57601000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 64800000, new Date(today - 57601000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 57600000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 50401000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 57600000, new Date(today - 50401000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 50400000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 43201000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 50400000, new Date(today - 43201000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 43200000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 36001000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 43200000, new Date(today - 36001000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 36000000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 28801000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 36000000, new Date(today - 28801000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 28800000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 21601000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 28800000, new Date(today - 21601000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 21600000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 14401000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 21600000, new Date(today - 14401000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 14400000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 7201000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 14400000, new Date(today - 7201000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 7200000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 7200000, today).count,
						},
					],
					count: lastday.length,
				});
				break;
			}
			case "last-2days": {
				const lastday = calculatePeriod(data, 172800000).data;

				setChartData({
					period: lastday,
					data: [
						{
							category: `${BeautyFullDay(new Date(today - 172800000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 158401000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 172800000, new Date(today - 158401000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 158400000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 144001000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 158400000, new Date(today - 144001000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 144000000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 129601000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 144000000, new Date(today - 129601000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 129600000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 115201000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 129600000, new Date(today - 115201000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 115200000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 100801000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 115200000, new Date(today - 100801000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 100800000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 86401000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 100800000, new Date(today - 86401000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 86400000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 72001000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 86400000, new Date(today - 72001000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 72000000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 57601000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 72000000, new Date(today - 57601000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 57600000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 43201000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 57600000, new Date(today - 43201000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 43200000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 28801000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 43200000, new Date(today - 28801000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 28800000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today - 14401000)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 28800000, new Date(today - 14401000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 14400000)).slice(
								8,
								16
							)} - ${BeautyFullDay(new Date(today)).slice(8, 16)}`,
							value: calculatePeriod(lastday, 14400000, today).count,
						},
					],
					count: lastday.length,
				});
				break;
			}
			case "last-week": {
				const lastday = calculatePeriod(data, 604800000).data;

				setChartData({
					period: lastday,
					data: [
						{
							category: `${BeautyFullDay(new Date(today - 604800000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 518401000)).slice(5)}`,
							value: calculatePeriod(lastday, 604800000, new Date(today - 518401000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 518400000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 432001000)).slice(5)}`,
							value: calculatePeriod(lastday, 518400000, new Date(today - 432001000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 432000000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 345601000)).slice(5)}`,
							value: calculatePeriod(lastday, 432000000, new Date(today - 345601000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 345600000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 259201000)).slice(5)}`,
							value: calculatePeriod(lastday, 345600000, new Date(today - 259201000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 259200000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 28801000)).slice(5)}`,
							value: calculatePeriod(lastday, 259200000, new Date(today - 28801000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 172800000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 86401000)).slice(5)}`,
							value: calculatePeriod(lastday, 172800000, new Date(today - 86401000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 86400000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today)).slice(5)}`,
							value: calculatePeriod(lastday, 86400000, today).count,
						},
					],
					count: lastday.length,
				});
				break;
			}
			case "last-2weeks": {
				const lastday = calculatePeriod(data, 1209600000).data;

				setChartData({
					period: lastday,
					data: [
						{
							category: `${BeautyFullDay(new Date(today - 1209600000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 1036801000)).slice(5)}`,
							value: calculatePeriod(
								lastday,
								1209600000,
								new Date(today - 1036801000)
							).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 1036800000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 864001000)).slice(5)}`,
							value: calculatePeriod(lastday, 1036800000, new Date(today - 864001000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 864000000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 691201000)).slice(5)}`,
							value: calculatePeriod(lastday, 864000000, new Date(today - 691201000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 691200000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 518401000)).slice(5)}`,
							value: calculatePeriod(lastday, 691200000, new Date(today - 518401000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 518400000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 345601000)).slice(5)}`,
							value: calculatePeriod(lastday, 518400000, new Date(today - 345601000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 345600000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 172801000)).slice(5)}`,
							value: calculatePeriod(lastday, 345600000, new Date(today - 172801000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 172800000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today)).slice(5)}`,
							value: calculatePeriod(lastday, 172800000, today).count,
						},
					],
					count: lastday.length,
				});
				break;
			}
			case "last-month": {
				const lastday = calculatePeriod(data, 2419200000).data;

				setChartData({
					period: lastday,
					data: [
						{
							category: `${BeautyFullDay(new Date(today - 2419200000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 1935361000)).slice(5)}`,
							value: calculatePeriod(
								lastday,
								2419200000,
								new Date(today - 1935361000)
							).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 1935360000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 1451521000)).slice(5)}`,
							value: calculatePeriod(
								lastday,
								1935360000,
								new Date(today - 1451521000)
							).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 1451520000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 967681000)).slice(5)}`,
							value: calculatePeriod(lastday, 1451520000, new Date(today - 967681000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 967680000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 483841000)).slice(5)}`,
							value: calculatePeriod(lastday, 967680000, new Date(today - 483841000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 483840000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today)).slice(5)}`,
							value: calculatePeriod(lastday, 483840000, today).count,
						},
					],
					count: lastday.length,
				});
				break;
			}
			case "last-2months": {
				const lastday = calculatePeriod(data, 4838400000).data;

				setChartData({
					period: lastday,
					data: [
						{
							category: `${BeautyFullDay(new Date(today - 4838400000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 3870721000)).slice(5)}`,
							value: calculatePeriod(
								lastday,
								4838400000,
								new Date(today - 3870721000)
							).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 3870720000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 2903041000)).slice(5)}`,
							value: calculatePeriod(
								lastday,
								3870720000,
								new Date(today - 2903041000)
							).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 2903040000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 1935361000)).slice(5)}`,
							value: calculatePeriod(
								lastday,
								2903040000,
								new Date(today - 1935361000)
							).count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 1935360000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today - 967681000)).slice(5)}`,
							value: calculatePeriod(lastday, 1935360000, new Date(today - 967681000))
								.count,
						},
						{
							category: `${BeautyFullDay(new Date(today - 967680000)).slice(
								5
							)} - ${BeautyFullDay(new Date(today)).slice(5)}`,
							value: calculatePeriod(lastday, 967680000, today).count,
						},
					],
					count: lastday.length,
				});
				break;
			}
		}
	}, [sort, data]);

	useEffect(() => {
		getData();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className={st.home}>
			<div className={st.home__manipulations}>
				<h4>{BeautyFullDay(today)}</h4>
				{console.log(chartData)}
				<CustomSelect
					title="Sort:"
					options={[
						{
							title: "Last 5 min.",
							value: "last-5",
						},
						{
							title: "Last 10 min.",
							value: "last-10",
						},
						{
							title: "Last 30 min.",
							value: "last-30",
						},
						{
							title: "Last day",
							value: "last-day",
						},
						{
							title: "Last 2 days",
							value: "last-2days",
						},
						{
							title: "Last week",
							value: "last-week",
						},
						{
							title: "Last 2 weeks",
							value: "last-2weeks",
						},
						{
							title: "Last month",
							value: "last-month",
						},
						{
							title: "Last 2 months",
							value: "last-2months",
						},
					]}
					value={sort}
					setValue={setSort}
					className="mx-3"
				/>
				<CustomButton title="Refresh" onClick={getData} />
			</div>
			<h5>Count: {chartData.count}</h5>
			{!load ? <Chart data={chartData.data} /> : console.log("loading")}
			<br />
			{chartData.period.length ? (
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
								</tr>
							</thead>
							<tbody>
								{chartData.period.map((item, i) => (
									<tr>
										<td>{i + 1}</td>
										<td>{item.name}</td>
										<td className="text-center">{item?.level?.name}</td>
										<td className="text-center">{item?.language}</td>
										<td className="text-center">{item.score}</td>
										<td className="text-center">{item.place}</td>
										<td className="text-center">
											{item.lastVisit.toString().slice(0, 24)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					}
				/>
			) : null}
		</div>
	);
};

export default Home;
