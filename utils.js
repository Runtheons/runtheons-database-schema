exports.dateFormat = (date) => {
	let d = new Date(date);
	return d.toJSON().substr(0, 10) + " " + d.toJSON().substr(11, 8);
}

exports.findTargetUser = async(models, target) => {
	const { User } = models;

	let user = await User.findOne({ where: { idTarget: target.idTarget } });
	if (user != null) {
		return user;
	}
	// Cerca ancora

	return null;

}