module.exports = (models) => {
	const { DiaryResult, DiaryCategory } = models;

	DiaryCategory.hasMany(DiaryResult, {
		foreignKey: 'idDiaryCategory',
		timestamps: false
	});

}