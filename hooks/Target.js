const { findTargetUser } = require("../utils");

module.exports = (models) => {
	const { Target, Event } = models;

	Target.addHook("afterUpdate", async(target, options) => {
		let user = await findTargetUser(models, target);
		if (user == null) {
			return;
		}

		if (target.minAge != target._previousDataValues.minAge ||
			target.maxAge != target._previousDataValues.maxAge) {
			Event.create({
				idUser: user.idUser,
				type: "TARGET_UPDATE_AGERANGE",
				value: target.idTarget,
				old: JSON.stringify(target._previousDataValues),
				new: JSON.stringify(target.dataValues),
			});
		}
	});
};