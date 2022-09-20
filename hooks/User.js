module.exports = (models) => {
	const { User, Event } = models;

	User.addHook("afterCreate", (user, options) => {
		Event.create({
			idUser: user.idUser,
			idEvent: "USER_CREATE",
			value: user.idUser,
			new: JSON.stringify(user),
		});
	});

	User.addHook("afterUpdate", (user, options) => {
		if (user.name != user._previousDataValues.name) {
			Event.create({
				idUser: user.idUser,
				idEvent: "USER_UPDATE_NAME",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user),
			});
		}
		if (user.surname != user._previousDataValues.surname) {
			Event.create({
				idUser: user.idUser,
				idEvent: "USER_UPDATE_SURNAME",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user),
			});
		}
		if (user.dateBirth != user._previousDataValues.dateBirth) {
			Event.create({
				idUser: user.idUser,
				idEvent: "USER_UPDATE_DATEBIRTH",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user),
			});
		}
		if (user.sex != user._previousDataValues.sex) {
			Event.create({
				idUser: user.idUser,
				idEvent: "USER_UPDATE_SEX",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user),
			});
		}
		if (user.photo != user._previousDataValues.photo) {
			Event.create({
				idUser: user.idUser,
				idEvent: "USER_UPDATE_PHOTO",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user),
			});
		}
		if (user.cover != user._previousDataValues.cover) {
			Event.create({
				idUser: user.idUser,
				idEvent: "USER_UPDATE_COVER",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user),
			});
		}
		if (user.title != user._previousDataValues.title) {
			Event.create({
				idUser: user.idUser,
				idEvent: "USER_UPDATE_TITLE",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user),
			});
		}
		if (user.biography != user._previousDataValues.biography) {
			Event.create({
				idUser: user.idUser,
				idEvent: "USER_UPDATE_BIOGRAPHY",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user),
			});
		}
		if (user.status != user._previousDataValues.status) {
			if (user.status == "DELETED") {
				Event.create({
					idUser: user.idUser,
					idEvent: "USER_DELETE",
					value: user.idUser,
					old: JSON.stringify(user._previousDataValues),
				});
			}
		}
	});
};