module.exports = (models) => {
	const { Target, Sport, Position, Sex, User } = models;

	Target.sports = Target.belongsToMany(Sport, {
		through: 'targetssports',
		as: 'sports',
		foreignKey: 'idTarget',
		otherKey: 'idSport',
		timestamps: false
	});

	Target.positions = Target.belongsToMany(Position, {
		through: 'targetspositions',
		as: 'positions',
		foreignKey: 'idTarget',
		otherKey: 'idPosition',
		timestamps: false
	});

	Target.sexs = Target.belongsToMany(Sex, {
		through: 'targetssexs',
		as: 'sexs',
		foreignKey: 'idTarget',
		otherKey: 'idSex',
		timestamps: false
	});

	Target.user = Target.hasOne(User, {
		foreignKey: {
			name: "idTarget",
			allowNull: true
		},
		as: 'user',
		timestamps: false
	})

	Target.addScope("defaultScope", {
		include: [{
			association: Target.positions,
		}, {
			association: Target.sports,
		}, {
			association: Target.sexs,
		}]
	});

};