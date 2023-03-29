const exec = require("./exec");

describe("GAMEQUESTION", () => {
	beforeEach(async () => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async () => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
	});

	test("C - Create a gamequestion", async () => {
		const models = await require("../index")();
		const { User, GameQuestion, Speciality } = models;

		let user = await User.findOne({ where: { idUser: 1 } });
		let speciality = await Speciality.findOne();

		let a = await GameQuestion.findAll();

		let gameQuestion = await GameQuestion.create({
			idUser: user.idUser,
			optionA: "A",
			optionB: "A",
			optionC: "A",
			optionD: "A",
			correct: "A",
			idSpeciality: speciality.idSpeciality,
			question: "Choose"
		});

		let b = await GameQuestion.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create a gamequestion (again)", async () => {
		const models = await require("../index")();
		const { User, GameQuestion, Speciality } = models;

		let user = await User.findOne({ where: { idUser: 1 } });
		let speciality = await Speciality.findOne();

		let a = await GameQuestion.findAll();

		let gameQuestion = await GameQuestion.create({
			idUser: user.idUser,
			optionA: "A",
			optionB: "A",
			optionC: "A",
			optionD: "A",
			correct: "A",
			idSpeciality: speciality.idSpeciality,
			question: "Choose"
		});

		let b = await GameQuestion.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create a gamequestion (checking event)", async () => {
		const models = await require("../index")();
		const { User, GameQuestion, Speciality, Event } = models;

		let user = await User.findOne({ where: { idUser: 1 } });
		let speciality = await Speciality.findOne();

		let a = await Event.findAll();

		let gameQuestion = await GameQuestion.create({
			idUser: user.idUser,
			optionA: "A",
			optionB: "A",
			optionC: "A",
			optionD: "A",
			correct: "A",
			idSpeciality: speciality.idSpeciality,
			question: "Choose"
		});

		let b = await Event.findAll();

		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("GAMEQUESTION_CREATE");
		expect(lastEvent.value).toEqual(gameQuestion.idGameQuestion);
	});

	test("R - Get all gamequestion", async () => {
		const models = await require("../index")();

		const { GameQuestion } = models;

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

		let a = await GameQuestion.findAll();

		expect(a.length).toEqual(1);

		let b = a[0];

		expect(b.idGameQuestion).toEqual(1);
		expect(b.idSpeciality).toEqual(6);
		expect(b.idUser).toEqual(1);
		expect(b.image).toEqual(null);
		expect(b.dateCreation).toEqual(gameQuestion.dateCreation);
		expect(b.lastUpdate).toEqual(gameQuestion.lastUpdate);
	});

	test("R - Get a gamequestion", async () => {
		const models = await require("../index")();

		const { GameQuestion } = models;

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

		let a = await GameQuestion.findOne({ where: { idGameQuestion: 1 } });

		expect(a.idGameQuestion).toEqual(1);
	});

});