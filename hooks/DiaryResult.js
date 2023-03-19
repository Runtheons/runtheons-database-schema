module.exports = (models) => {
	const { DiaryCategory, DiaryResult, Event } = models;

	DiaryCategory.addHook("afterCreate", async (diaryCategory, options) => {
		await Event.create({
			idUser: diaryCategory.idUser,
			type: "DIARYCATEGORY_CREATE",
			value: diaryCategory.idDiaryCategory,
			new: JSON.stringify(diaryCategory.dataValues),
		});
	});

	DiaryResult.addHook("afterCreate", async (diaryResult, options) => {
		await Event.create({
			idUser: diaryResult.idUser,
			type: "DIARYRESULT_CREATE",
			value: diaryResult.idDiaryResult,
			new: JSON.stringify(diaryResult.dataValues),
		});
	});

	DiaryResult.addHook("afterUpdate", async (diaryResult, options) => {
		if (diaryResult.status != diaryResult._previousDataValues.status && diaryResult.status == "DELETED") {
			Event.create({
				idUser: diaryResult.idUser,
				type: "DIARYRESULT_DELETE",
				value: diaryResult.idDiaryResult,
				old: JSON.stringify(diaryResult._previousDataValues),
				new: JSON.stringify(diaryResult.dataValues),
			});
		} else {
			Event.create({
				idUser: diaryResult.idUser,
				type: "DIARYRESULT_UPDATE",
				value: diaryResult.idDiaryResult,
				old: JSON.stringify(diaryResult._previousDataValues),
				new: JSON.stringify(diaryResult.dataValues),
			});
		}
	});

};