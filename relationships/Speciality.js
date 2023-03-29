module.exports = (models) => {
	const { User, Speciality, GameQuestion } = models;

	Speciality.users = Speciality.belongsToMany(User, {
		through: 'usersspecialities',
		as: 'users',
		foreignKey: 'idSpeciality',
		otherKey: 'idUser',
		timestamps: false
	});


	Speciality.questions = User.hasMany(GameQuestion, {
		foreignKey: {
			name: "idSpeciality",
			allowNull: true
		},
		timestamps: false
	})


};