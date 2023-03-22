module.exports = (models) => {
	const { DiaryResult, DiaryCategory, User } = models;

	DiaryResult.user = DiaryResult.belongsTo(User, {
		foreignKey: 'idUser',
		as: 'user',
		timestamps: false
	});

	DiaryResult.category = DiaryResult.belongsTo(DiaryCategory, {
		foreignKey: 'idDiaryCategory',
		as: 'category',
		timestamps: false
	});

	DiaryResult.addScope("defaultScope", {
		include: [{
			association: DiaryResult.user,
		}, {
			association: DiaryResult.category,
		}]
	});
}