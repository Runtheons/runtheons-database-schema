module.exports = (models) => {
	const { User, Speciality, GameQuestion, GameAnser } = models;

	GameQuestion.speciality = GameQuestion.belongsTo(Speciality, {
		foreignKey: {
			name: "idSpeciality",
			allowNull: true
		},
		timestamps: false,
		as: 'speciality',
	});

	GameQuestion.creator = GameQuestion.belongsTo(User, {
		foreignKey: {
			name: "idUser",
			allowNull: true
		},
		timestamps: false,
		as: 'creator',
	});

	GameAnser.user = GameAnser.belongsTo(User, {
		foreignKey: {
			name: "idUser",
			allowNull: true
		},
		timestamps: false,
		as: 'user',
	});

	GameQuestion.addScope("defaultScope", {
		include: [{
			association: GameQuestion.creator,
		}]
	});

};