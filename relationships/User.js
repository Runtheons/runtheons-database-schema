module.exports = (models) => {
	const { User, Sport } = models;

	// User.sports = User.belongsToMany(Sport, {
	// 	through: 'userssports',
	// 	as: 'sports',
	// 	foreignKey: 'idUser',
	// 	otherKey: 'idSport',
	// 	timestamps: false
	// });
};