const exec = require("./exec");

describe("DIARYRESULT", () => {
	beforeEach(async () => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async () => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
	});

	test("C - Create a diaryresult", async () => {
		const models = await require("../index")();
		const { DiaryCategory, DiaryResult, User } = models;

		let user = await User.findOne({ where: { idUser: 1 } });
		let diaryCategory = await DiaryCategory.create({ idUser: user.idUser, description: "Corsa" });

		let a = await DiaryResult.findAll();

		let diaryResult = await DiaryResult.create({
			idUser: user.idUser,
			idDiaryCategory: diaryCategory.idDiaryCategory,
			date: '2023-10-10',
			description: "Molto bello",
			image: null
		});

		expect(diaryResult.value).toEqual("0s");

		let b = await DiaryResult.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create a diaryresult (again)", async () => {
		const models = await require("../index")();
		const { DiaryCategory, DiaryResult, User } = models;

		let user = await User.findOne({ where: { idUser: 1 } });
		let diaryCategory = await DiaryCategory.create({ idUser: user.idUser, description: "Corsa" });

		let a = await DiaryResult.findAll();

		let diaryResult = await DiaryResult.create({
			idUser: user.idUser,
			idDiaryCategory: diaryCategory.idDiaryCategory,
			date: '2023-10-10',
			resultType: "AVERAGE",
			description: "Molto bello",
			image: null
		});

		expect(diaryResult.value).toEqual("Media 0s");

		let b = await DiaryResult.findAll();
		expect(b.length).toEqual(a.length + 1);
	});


	test("C - Create a diaryresult (findOrCreate diaryCategory)", async () => {
		const models = await require("../index")();
		const { DiaryCategory, DiaryResult, User } = models;

		let user = await User.findOne({ where: { idUser: 1 } });
		await DiaryCategory.create({ idUser: user.idUser, description: "Corsa" });

		let [diaryCategory, created] = await DiaryCategory.findOrCreate({
			where: {
				idUser: 1,
				description: "Corsa"
			}
		});

		let a = await DiaryResult.findAll();

		let diaryResult = await DiaryResult.create({
			idUser: user.idUser,
			idDiaryCategory: diaryCategory.idDiaryCategory,
			date: '2023-10-10',
			resultType: "AVERAGE",
			description: "Molto bello",
			image: null
		})

		expect(diaryResult.value).toEqual("Media 0s");

		let b = await DiaryResult.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create a diaryresult (checking event)", async () => {
		const models = await require("../index")();
		const { DiaryCategory, DiaryResult, User, Event } = models;

		let user = await User.findOne({ where: { idUser: 1 } });
		let diaryCategory = await DiaryCategory.create({ idUser: user.idUser, description: "Corsa" });

		let a = await Event.findAll();

		let diaryResult = await DiaryResult.create({
			idUser: user.idUser,
			idDiaryCategory: diaryCategory.idDiaryCategory,
			date: '2023-10-10',
			description: "Molto bello",
			image: null
		});

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("DIARYRESULT_CREATE");
		expect(lastEvent.value).toEqual(diaryResult.idDiaryResult);
	});

	test("R - Get all diaryresult", async () => {
		const models = await require("../index")();

		const { DiaryCategory, DiaryResult } = models;

		let diaryCategory = await DiaryCategory.create({ idUser: 1, description: "Corsa" });

		let diaryResult = await DiaryResult.create({
			idUser: 1,
			idDiaryCategory: diaryCategory.idDiaryCategory,
			date: '2023-10-10',
			description: "Molto bello",
			image: null
		});

		let a = await DiaryResult.findAll();

		expect(a.length).toEqual(1);

		let b = a[0];

		expect(b.idDiaryResult).toEqual(1);
		expect(b.idDiaryCategory).toEqual(diaryCategory.idDiaryCategory);
		expect(b.idUser).toEqual(1);
		expect(b.date).toEqual("2023-10-10");
		expect(b.description).toEqual("Molto bello");
		expect(b.image).toEqual(null);
		expect(b.dateCreation).toEqual(diaryResult.dateCreation);
		expect(b.lastUpdate).toEqual(diaryResult.lastUpdate);
	});

	test("R - Get all diaryresult of an user", async () => {
		const models = await require("../index")();

		const { DiaryCategory, DiaryResult, User } = models;

		let diaryCategory = await DiaryCategory.create({ idUser: 1, description: "Corsa" });

		let diaryResult = await DiaryResult.create({
			idUser: 1,
			idDiaryCategory: diaryCategory.idDiaryCategory,
			date: '2023-10-10',
			description: "Molto bello",
			image: null
		});

		let a = await DiaryResult.findAll({ where: { idUser: 1 } });

		expect(a.length).toEqual(1);
	});

	test("U - Update a diaryresult as private", async () => {
		const models = await require("../index")();

		const { DiaryCategory, DiaryResult } = models;

		let diaryCategory = await DiaryCategory.create({ idUser: 1, description: "Corsa" });
		await DiaryResult.create({
			idUser: 1,
			idDiaryCategory: diaryCategory.idDiaryCategory,
			date: '2023-10-10',
			description: "Molto bello",
			image: null
		});

		let diaryResult = await DiaryResult.findOne();

		diaryResult.status = "PRIVATE";
		await diaryResult.save();

		let a = await DiaryResult.findOne();

		expect(a.dataValues).toEqual(diaryResult.dataValues);
	});

	test("U - Update a diaryresult as private (checking event)", async () => {
		const models = await require("../index")();

		const { DiaryCategory, DiaryResult, Event } = models;

		let diaryCategory = await DiaryCategory.create({ idUser: 1, description: "Corsa" });
		await DiaryResult.create({
			idUser: 1,
			idDiaryCategory: diaryCategory.idDiaryCategory,
			date: '2023-10-10',
			description: "Molto bello",
			image: null
		});

		let a = await Event.findAll();

		let diaryResult = await DiaryResult.findOne();

		diaryResult.status = "PRIVATE";
		await diaryResult.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("DIARYRESULT_UPDATE");
		expect(lastEvent.value).toEqual(diaryResult.idDiaryResult);
	});

	test("D - Delete a diaryresult (checking event)", async () => {
		const models = await require("../index")();

		const { DiaryCategory, DiaryResult, Event } = models;

		let diaryCategory = await DiaryCategory.create({ idUser: 1, description: "Corsa" });
		await DiaryResult.create({
			idUser: 1,
			idDiaryCategory: diaryCategory.idDiaryCategory,
			date: '2023-10-10',
			description: "Molto bello",
			image: null
		});

		let a = await Event.findAll();

		let diaryResult = await DiaryResult.findOne();

		diaryResult.status = "DELETED";
		await diaryResult.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("DIARYRESULT_DELETE");
		expect(lastEvent.value).toEqual(diaryResult.idDiaryResult);
	});


});