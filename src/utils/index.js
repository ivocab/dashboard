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

export const BeautyFullDay = (today) => {
	return `${today.getFullYear()}-${
		today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
	}-${today.getDate()} ${today.getHours() > 9 ? today.getHours() : `0${today.getHours()}`}:${
		today.getMinutes() > 9 ? today.getMinutes() : `0${today.getMinutes()}`
	}:${today.getSeconds() > 9 ? today.getSeconds() : `0${today.getSeconds()}`}`;
};

export const GeneralSort = (data, sort) => {
	const temp = [...data];
	let mas, temp2;

	if (sort === "lowest") {
		mas = temp.sort(function (a, b) {
			return +a.score - +b.score;
		});

		temp2 = mas.map((item, i) => ({
			...item,
			place: mas.length - i,
			lastVisit: new Date(Date.parse(item.updatedAt)),
		}));

		return temp2;
	}

	mas = temp.sort(function (a, b) {
		return +b.score - +a.score;
	});

	temp2 = mas.map((item, i) => ({
		...item,
		place: i + 1,
		lastVisit: new Date(Date.parse(item.updatedAt)),
	}));

	if (sort === "best") return temp2;

	if (sort === "last") {
		const mas2 = temp2.sort(function (a, b) {
			return b.lastVisit - a.lastVisit;
		});

		return mas2;
	} else if (sort === "first") {
		const mas2 = temp2.sort(function (a, b) {
			return a.lastVisit - b.lastVisit;
		});

		return mas2;
	}
};

export const DelToken = (navigate, dispatch) => {
	localStorage.removeItem("token");
	dispatch(LogOut());
	navigate("/login");
	return null;
};

export const randomColor = () => {
	return Math.floor(Math.random() * 16777215).toString(16);
};
