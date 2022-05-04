import { LogOut } from "../store/auth";

export const BeautyDate = (num) => {
	return num.toString().split("").slice(0, 10).join("").split("-").join("-");
};

export const BeautyTime = (num) => {
	return num.toString().split("").slice(11, 16).join("");
};

export const BeautyFullTime = (num) => {
	return BeautyDate(num) + " " + BeautyTime(num);
};

export const GeneralSort = (data) => {
	const temp = [...data];

	const mas = temp.sort(function (a, b) {
		return +b.score - +a.score;
	});

	const temp2 = mas.map((item, i) => ({
		...item,
		place: i + 1,
		lastVisit: new Date(Date.parse(item.updatedAt)),
	}));

	const mas2 = temp2.sort(function (a, b) {
		return b.lastVisit - a.lastVisit;
	});

	return mas2;
};

export const DelToken = (navigate, dispatch) => {
	localStorage.removeItem("token");
	dispatch(LogOut());
	navigate("/login");
	return null;
};
