module.exports = (models) => {
	const { User, Position } = models;

	Position.user = Position.hasOne(User, {
		foreignKey: 'idPosition',
		as: 'user',
		timestamps: false
	})
};