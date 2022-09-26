exports.dateFormat = (date) => {
	let d = new Date(date);
	console.log(d);
	return d.toJSON().substr(0, 10) + " " + d.toJSON().substr(11, 8);
}