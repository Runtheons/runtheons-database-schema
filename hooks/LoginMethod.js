module.exports = (models) => {
	const { LoginMethod, Event } = models;

	LoginMethod.addHook("afterCreate", async(loginMethod, options) => {
		await Event.create({
			idUser: loginMethod.idUser,
			type: "LOGINMETHOD_CREATE",
			value: loginMethod.idLoginMethod,
			new: JSON.stringify(loginMethod.dataValues),
		});
	});

	LoginMethod.addHook("afterUpdate", async(loginMethod, options) => {
		await Event.create({
			idUser: loginMethod.idUser,
			type: "LOGINMETHOD_UPDATE",
			value: loginMethod.idLoginMethod,
			old: JSON.stringify(loginMethod._previousDataValues),
			new: JSON.stringify(loginMethod.dataValues),
		});
	});

	LoginMethod.addHook("afterDestroy", async(loginMethod, options) => {
		await Event.create({
			idUser: loginMethod.idUser,
			type: "LOGINMETHOD_DELETE",
			value: loginMethod._previousDataValues.idLoginMethod,
			old: JSON.stringify(loginMethod._previousDataValues),
		});
	});
};