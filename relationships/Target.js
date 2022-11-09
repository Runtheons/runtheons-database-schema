module.exports = (models) => {
	const { Target, Sport, Position, Sex } = models;

	Target.sports = Target.belongsToMany(Sport, {
		through: 'targetssports',
		as: 'sports',
		foreignKey: 'iTarget',
		otherKey: 'idSport',
		timestamps: false
	});

	Target.positions = Target.belongsToMany(Position, {
		through: 'targetspositions',
		as: 'positions',
		foreignKey: 'iTarget',
		otherKey: 'idPosition',
		timestamps: false
	});

	Target.sexs = Target.belongsToMany(Sex, {
		through: 'targetsspecialities',
		as: 'sexs',
		foreignKey: 'idTarget',
		otherKey: 'idSex',
		timestamps: false
	});


	Target.addScope("defaultScope", {
		include: [{
			association: Target.positions,
		}, {
			association: Target.goals,
		}, {
			association: Target.sexs,
		}]
	});

};