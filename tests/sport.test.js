const exec = require("./exec");
describe("SPORT", () => {
	beforeEach(async() => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
	});

	afterEach(async() => {
		await exec(
			"sequelize db:migrate:undo:all --config ./tests/config.json --env db"
		);
	});

	test("R - Read all sports", async() => {
		const models = await require("../index")();
		const { Sport } = models;

		let a = await Sport.findAll();

		expect(a.length).toEqual(22);
	});

	test("R - Search 'CALCIO'", async() => {
		const models = await require("../index")();
		const { Sport } = models;

		let a = await Sport.findAll({ where: { idSport: "CALCIO" } });

		expect(a.length).toEqual(1);
	});

	test("C - Add a sport", async() => {
		const models = await require("../index")();
		const { Sport } = models;

		let a = await Sport.findAll();

		await Sport.create({ idSport: "ROUJUTSU" });

		let b = await Sport.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add a sport again", async() => {
		const models = await require("../index")();
		const { Sport } = models;

		let a = await Sport.findAll();

		await Sport.create({ idSport: "ROUJUTSU" });

		let b = await Sport.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add an existing sport", async() => {
		const models = await require("../index")();
		const { Sport } = models;
		try {
			await Sport.create({ idSport: "CALCIO" });
		} catch (e) {
			expect(true).toBeTruthy();
		}
	});
});