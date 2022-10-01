module.exports = (models) => {
	const { User, Sport, Speciality, Position } = models;

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

	// User.goals = User.belongsToMany(Goals, {
	// 	through: 'usersgoals',
	// 	as: 'goals',
	// 	foreignKey: 'idUser',
	// 	otherKey: 'idGoal',
	// 	timestamps: false
	// });

	User.specialities = User.belongsToMany(Speciality, {
		through: 'usersspecialities',
		as: 'specialities',
		foreignKey: 'idUser',
		otherKey: 'idSpeciality',
		timestamps: false
	});


	User.addScope("defaultScope", {
		include: [{
			association: User.position,
		}, {
			association: User.sports,
		}, {
			association: User.specialities,
		}]
	});
};