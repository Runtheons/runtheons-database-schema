module.exports = (models) => {
	const { User, Position } = models;

	User.position = User.hasOne(Position, {
		foreignKey: 'idPosition',
		as: 'position',
		timestamps: false
	})

	// User.sports = User.belongsToMany(Sport, {
	// 	through: 'userssports',
	// 	as: 'sports',
	// 	foreignKey: 'idUser',
	// 	otherKey: 'idSport',
	// 	timestamps: false
	// });

	User.addScope("default", {
		include: [{
			association: User.position,
		}]
	});
};