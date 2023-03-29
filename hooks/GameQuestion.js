module.exports = (models) => {
	const { GameQuestion, GameAnser, Event } = models;

	GameQuestion.addHook("afterCreate", async (gameQuestion, options) => {
		await Event.create({
			idUser: gameQuestion.idUser,
			type: "GAMEQUESTION_CREATE",
			value: gameQuestion.idGameQuestion,
			new: JSON.stringify(gameQuestion.dataValues),
		});
	});

	GameAnser.addHook("afterCreate", async (gameAnser, options) => {
		await Event.create({
			idUser: gameAnser.idUser,
			type: "GAMEANSER_CREATE",
			value: gameAnser.idGameAnser,
			new: JSON.stringify(gameAnser.dataValues),
		});
	});

};