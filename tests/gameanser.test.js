const exec = require("./exec");

describe("GAMEANSER", () => {
	beforeEach(async () => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async () => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
	});

	test("C - Create a gameanser", async () => {
		const models = await require("../index")();
		const { GameQuestion, GameAnser } = models;

		let gameQuestion = await GameQuestion.create({
			idUser: 1,
			optionA: "A",
			optionB: "A",
			optionC: "A",
			optionD: "A",
			correct: "A",
			idSpeciality: 6,
			question: "Choose"
		});

		let a = await GameAnser.findAll();

		let gameAnser = await GameAnser.create({
			idGameQuestion: gameQuestion.idGameQuestion,
			idUser: 2
		});

		let b = await GameAnser.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create a gamequestion (again)", async () => {
		const models = await require("../index")();
		const { GameQuestion, GameAnser } = models;

		let gameQuestion = await GameQuestion.create({
			idUser: 1,
			optionA: "A",
			optionB: "A",
			optionC: "A",
			optionD: "A",
			correct: "A",
			idSpeciality: 6,
			question: "Choose"
		});

		let a = await GameAnser.findAll();

		let gameAnser = await GameAnser.create({
			idGameQuestion: gameQuestion.idGameQuestion,
			idUser: 2
		});

		let b = await GameAnser.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create a gamequestion (checking event)", async () => {
		const models = await require("../index")();
		const { GameQuestion, GameAnser, Event } = models;

		let gameQuestion = await GameQuestion.create({
			idUser: 1,
			optionA: "A",
			optionB: "A",
			optionC: "A",
			optionD: "A",
			correct: "A",
			idSpeciality: 6,
			question: "Choose"
		});

		let a = await Event.findAll();

		let gameAnser = await GameAnser.create({
			idGameQuestion: gameQuestion.idGameQuestion,
			idUser: 2
		});

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(2);
		expect(lastEvent.type).toEqual("GAMEANSER_CREATE");
		expect(lastEvent.value).toEqual(gameAnser.idGameAnser);
	});

});