module.exports = (models) => {
	const { User, Sex, Target } = models;

	Sex.user = Sex.hasOne(User, {
		foreignKey: 'sex',
		as: 'user',
		timestamps: false
	})

	Sex.targets = Sex.belongsToMany(Target, {
		through: 'targetssexs',
		as: 'targets',
		foreignKey: 'idSex',
		otherKey: 'idTarget',
		timestamps: false
	});

};