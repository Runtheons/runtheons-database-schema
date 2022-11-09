module.exports = (models) => {
	const { User, Position, Target } = models;

	Position.user = Position.hasOne(User, {
		foreignKey: 'idPosition',
		as: 'user',
		timestamps: false
	});

	Position.targets = Position.belongsToMany(Target, {
		through: 'targetspositions',
		as: 'targets',
		foreignKey: 'idPosition',
		otherKey: 'idTarget',
		timestamps: false
	});

};