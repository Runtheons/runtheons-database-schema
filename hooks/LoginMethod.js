module.exports = (models) => {
	const { LoginMethod, Event } = models;

	LoginMethod.addHook("afterCreate", (loginMethod, options) => {
		Event.create({
			idUser: loginMethod.idUser,
			idEvent: "LOGINMETHOD_CREATE",
			value: loginMethod.idLoginMethod,
			new: JSON.stringify(loginMethod),
		});
	});

	LoginMethod.addHook("afterUpdate", (loginMethod, options) => {
		Event.create({
			idUser: loginMethod.idUser,
			idEvent: "LOGINMETHOD_DELETE",
			value: loginMethod.idLoginMethod,
			old: JSON.stringify(loginMethod._previousDataValues),
			new: JSON.stringify(loginMethod),
		});
	});

	LoginMethod.addHook("afterDestroy", (loginMethod, options) => {
		Event.create({
			idUser: loginMethod.idUser,
			idEvent: "LOGINMETHOD_DELETE",
			old: JSON.stringify(loginMethod),
		});
	});
};