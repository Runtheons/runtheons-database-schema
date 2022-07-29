module.exports = (models) => {
	const { User, Log } = models;
	// User.addHook("afterCreate", (user, options) => {
	// 	Log.create({
	// 		idUser: user.idUser,
	// 		idEvent: "USERS_CREATION",
	// 		value: user.idUser,
	// 	});
	// });
};