const exec = require("./exec");
describe("DIARYCATEGORY", () => {
	beforeEach(async () => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async () => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
	});

	test("C - Add a diaryCategory", async () => {
		const models = await require("../index")();
		const { DiaryCategory } = models;

		let a = await DiaryCategory.findAll();

		await DiaryCategory.create({ idUser: 1, description: "Corsa" });

		let b = await DiaryCategory.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add a diaryCategory again", async () => {
		const models = await require("../index")();
		const { DiaryCategory } = models;

		let a = await DiaryCategory.findAll();

		await DiaryCategory.create({ idUser: 1, description: "Corsa" });

		let b = await DiaryCategory.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add a diaryCategory (checking event)", async () => {
		const models = await require("../index")();
		const { DiaryCategory, Event } = models;

		let a = await Event.findAll();

		let diaryCategory = await DiaryCategory.create({ idUser: 1, description: "Corsa" });

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("DIARYCATEGORY_CREATE");
		expect(lastEvent.value).toEqual(diaryCategory.idDiaryCategory);
	});

	test("C - Add an existing diaryCategory", async () => {
		const models = await require("../index")();
		const { DiaryCategory } = models;

		await DiaryCategory.create({ idUser: 1, description: "Corsa" });

		try {
			await DiaryCategory.create({ idUser: 1, description: "Corsa" });
		} catch (e) {
			expect(true).toBeTruthy();
		}
	});

	test("R - Read all diaryCategory of an user", async () => {
		const models = await require("../index")();
		const { DiaryCategory } = models;

		await DiaryCategory.create({ idUser: 1, description: "Corsa" });
		await DiaryCategory.create({ idUser: 1, description: "800mt" });

		let a = await DiaryCategory.findAll({ where: { idUser: 1 } });

		expect(a.length).toEqual(2);
	});

});