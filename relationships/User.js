module.exports = (models) => {
	const { User, Sport, Position } = models;

	User.position = User.belongsTo(Position, {
		foreignKey: 'idPosition',
		as: 'position',
		timestamps: false
	});

	User.sports = User.belongsToMany(Sport, {
		through: 'userssports',
		as: 'sports',
		foreignKey: 'idUser',
		otherKey: 'idSport',
		timestamps: false
	});


	User.addScope("defaultScope", {
		include: [{
			association: User.position,
		}, {
			association: User.sports,
		}]
	});
};