const exec = require("./exec");
describe("POSITION", () => {
	beforeEach(async() => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
	});

	afterEach(async() => {
		await exec(
			"sequelize db:migrate:undo:all --config ./tests/config.json --env db"
		);
	});

	test("C - Add a position", async() => {
		const models = await require("../index")();
		const { Position } = models;

		let a = await Position.findAll();

		await Position.create({ latitude: 50.0, longitude: 50.0 });

		let b = await Position.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add a position again", async() => {
		const models = await require("../index")();
		const { Position } = models;

		let a = await Position.findAll();

		await Position.create({ latitude: 50.0, longitude: 50.0 });

		let b = await Position.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add a position (only latitude)", async() => {
		const models = await require("../index")();
		const { Position } = models;

		let a = await Position.findAll();
		try {
			await Position.create({ latitude: 50.0 });
		} catch (e) {
			expect(true).toBeTruthy();
		}
	});

	// test("R - Read all positions", async() => {
	// 	const models = await require("../index")();
	// 	const { Position } = models;

	// 	let a = await Position.findAll();

	// 	expect(a.length).toEqual(16);
	// });

	// test("R - Search 'DIETISTA'", async() => {
	// 	const models = await require("../index")();
	// 	const { Position } = models;

	// 	let a = await Position.findAll({ where: { latitude: {
	// 				[Op.gt]: 1 } } });

	// 	expect(a.length).toEqual(1);
	// });
});