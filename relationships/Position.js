module.exports = (models) => {
	const { User, Position } = models;

	Position.user = Position.belongsTo(User, {
		foreignKey: 'idPosition',
		as: 'user',
		timestamps: false
	})
};