module.exports = (models) => {
	const { User, Sport } = models;

	// Sport.users = Sport.belongsToMany(User, {
	// 	through: 'userssports',
	// 	as: 'users',
	// 	foreignKey: 'idSport',
	// 	otherKey: 'idUser',
	// 	timestamps: false
	// });
};