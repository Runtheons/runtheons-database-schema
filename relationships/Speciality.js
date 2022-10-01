module.exports = (models) => {
	const { User, Speciality } = models;

	Speciality.users = Speciality.belongsToMany(User, {
		through: 'usersspecialities',
		as: 'users',
		foreignKey: 'idSpeciality',
		otherKey: 'idUser',
		timestamps: false
	});
};