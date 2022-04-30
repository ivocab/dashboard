export function BeautyDate(num) {
	return num.toString().split("").slice(0, 10).join("").split("-").join("-");
}

export function BeautyTime(num) {
	return num.toString().split("").slice(11, 16).join("");
}

export function BeautyFullTime(num) {
	return BeautyDate(num) + " " + BeautyTime(num);
}

export function JamesSort(data) {
	const temp = [...data];

	const mas = temp.sort(function (a, b) {
		return a.score - b.score;
	});

	return mas;
}
