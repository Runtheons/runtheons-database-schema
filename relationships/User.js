module.exports = (models) => {
	const { User, Sport, Goal, Speciality, Position, Sex, Target } = models;

	User.position = User.belongsTo(Position, {
		foreignKey: 'idPosition',
		as: 'position',
		timestamps: false
	});

	User.sex = User.belongsTo(Sex, {
		foreignKey: {
			name: "sex",
			allowNull: true
		},
		timestamps: false,
	});

	User.target = User.belongsTo(Target, {
		foreignKey: {
			name: "idTarget",
			allowNull: true
		},
		timestamps: false,
		as: 'target',
	});

	User.sports = User.belongsToMany(Sport, {
		through: 'userssports',
		as: 'sports',
		foreignKey: 'idUser',
		otherKey: 'idSport',
		timestamps: false
	});

	User.goals = User.belongsToMany(Goal, {
		through: 'usersgoals',
		as: 'goals',
		foreignKey: 'idUser',
		otherKey: 'idGoal',
		timestamps: false
	});

	User.specialities = User.belongsToMany(Speciality, {
		through: 'usersspecialities',
		as: 'specialities',
		foreignKey: 'idUser',
		otherKey: 'idSpeciality',
		timestamps: false
	});


	User.addScope("defaultScope", {
		include: [{
			association: User.position,
		}, {
			association: User.sports,
		}, {
			association: User.goals,
		}, {
			association: User.specialities,
		}]
	});

	User.addScope("active", {
		where: {
			status: "ACTIVE"
		}
	});

	User.addScope("deleted", {
		where: {
			status: "DELETED"
		}
	});

	User.addScope("athlete", {
		where: {
			type: "ATHLETE"
		}
	});

	User.addScope("professionist", {
		where: {
			type: "PROFESSIONIST"
		},
		include: [{
			association: User.target,
		}]
	});

};