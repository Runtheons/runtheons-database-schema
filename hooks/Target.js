const User = require("./User");

module.exports = (models) => {
	const { Target, Event, User } = models;

	const findUser = async(target) => {
		let user = await User.findOne({ where: { idTarget: target.idTarget } });
		if (user !== null) {
			return user;
		}
		// Cerca ancora
		return null;
	}



};