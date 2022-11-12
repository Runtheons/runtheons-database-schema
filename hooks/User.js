module.exports = (models) => {
	const { User, Event, Position, Target } = models;

	User.addHook("afterCreate", (user, options) => {
		Event.create({
			idUser: user.idUser,
			type: "USER_CREATE",
			value: user.idUser,
			new: JSON.stringify(user.dataValues),
		});
	});

	User.addHook("afterUpdate", async(user, options) => {
		if (user.name != user._previousDataValues.name) {
			Event.create({
				idUser: user.idUser,
				type: "USER_UPDATE_NAME",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user.dataValues),
			});
		}
		if (user.surname != user._previousDataValues.surname) {
			Event.create({
				idUser: user.idUser,
				type: "USER_UPDATE_SURNAME",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user.dataValues),
			});
		}
		if (user.dateBirth != user._previousDataValues.dateBirth) {
			Event.create({
				idUser: user.idUser,
				type: "USER_UPDATE_DATEBIRTH",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user.dataValues),
			});
		}
		if (user.sex != user._previousDataValues.sex) {
			Event.create({
				idUser: user.idUser,
				type: "USER_UPDATE_SEX",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user.dataValues),
			});
		}
		if (user.idPosition != user._previousDataValues.idPosition) {
			user.dataValues.position = await Position.findAll({ where: { idPosition: user.dataValues.idPosition } });
			Event.create({
				idUser: user.idUser,
				type: "USER_UPDATE_POSITION",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user.dataValues),
			});
		}

		if (user.idTarget != user._previousDataValues.idTarget) {
			let target = await Target.findAll({ where: { idTarget: user.dataValues.idTarget } });

			if (user._previousDataValues.idTarget == null) {
				Event.create({
					idUser: user.idUser,
					type: "TARGET_CREATE",
					value: user.idTarget,
					new: JSON.stringify(target.dataValues),
				});
			} else {
				// Event.create({
				// 	idUser: user.idUser,
				// 	type: "USER_UPDATE_POSITION",
				// 	value: user.idUser,
				// 	old: JSON.stringify(user._previousDataValues),
				// 	new: JSON.stringify(user.dataValues),
				// });
			}
		}

		if (user.photo != user._previousDataValues.photo) {
			Event.create({
				idUser: user.idUser,
				type: "USER_UPDATE_PHOTO",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user),
			});
		}
		if (user.cover != user._previousDataValues.cover) {
			Event.create({
				idUser: user.idUser,
				type: "USER_UPDATE_COVER",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user),
			});
		}
		if (user.title != user._previousDataValues.title) {
			Event.create({
				idUser: user.idUser,
				type: "USER_UPDATE_TITLE",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user),
			});
		}
		if (user.biography != user._previousDataValues.biography) {
			Event.create({
				idUser: user.idUser,
				type: "USER_UPDATE_BIOGRAPHY",
				value: user.idUser,
				old: JSON.stringify(user._previousDataValues),
				new: JSON.stringify(user),
			});
		}
		if (user.status != user._previousDataValues.status) {
			switch (user.status) {
				case "DELETED":
					Event.create({
						idUser: user.idUser,
						type: "USER_DELETE",
						value: user.idUser,
						old: JSON.stringify(user._previousDataValues),
					});
					break;
			}
		}
	});
};