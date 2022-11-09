module.exports = (models) => {
	const { User, Sex } = models;

	Sex.user = Sex.hasOne(User, {
		foreignKey: 'sex',
		as: 'user',
		timestamps: false
	})
};