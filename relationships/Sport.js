module.exports = (models) => {
	const { User, Sport, Target } = models;

	Sport.users = Sport.belongsToMany(User, {
		through: 'userssports',
		as: 'users',
		foreignKey: 'idSport',
		otherKey: 'idUser',
		timestamps: false
	});

	Sport.targets = Sport.belongsToMany(Target, {
		through: 'targetssports',
		as: 'targets',
		foreignKey: 'idSport',
		otherKey: 'idTarget',
		timestamps: false
	});

};