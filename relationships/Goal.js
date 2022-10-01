module.exports = (models) => {
	const { User, Goal } = models;

	Goal.users = Goal.belongsToMany(User, {
		through: 'usersspecialities',
		as: 'users',
		foreignKey: 'idGoal',
		otherKey: 'idUser',
		timestamps: false
	});
};