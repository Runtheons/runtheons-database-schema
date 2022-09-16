const exec = require("./exec");
describe("LOGINMETHOD", () => {
	beforeEach(async() => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
	});

	afterEach(async() => {
		await exec(
			"sequelize db:migrate:undo:all --config ./tests/config.json --env db"
		);
	});

	// test("C - Add a sport", async() => {
	// 	const models = await require("../index")();
	// 	const { Sport } = models;

	// 	let a = await Sport.findAll();

	// 	await Sport.create({ description: "ROUJUTSU" });

	// 	let b = await Sport.findAll();
	// 	expect(b.length).toEqual(a.length + 1);
	// });

	// test("C - Add a sport again", async() => {
	// 	const models = await require("../index")();
	// 	const { Sport } = models;

	// 	let a = await Sport.findAll();

	// 	await Sport.create({ description: "ROUJUTSU" });

	// 	let b = await Sport.findAll();
	// 	expect(b.length).toEqual(a.length + 1);
	// });

	// test("C - Add an existing sport", async() => {
	// 	const models = await require("../index")();
	// 	const { Sport } = models;
	// 	try {
	// 		await Sport.create({ description: "CALCIO" });
	// 	} catch (e) {
	// 		expect(true).toBeTruthy();
	// 	}
	// });

	test("R - Read all login methods of an user (by email)", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;

		let a = await LoginMethod.findAll({
			where: { email: "gallinar00@gmail.com" },
		});

		//TODO: Add test data
		expect(a.length).toEqual(0);
	});
	test("R - Search a login methods of an user by email and type", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;

		let a = await LoginMethod.findAll({
			where: { email: "gallinar00@gmail.com", type: "CLASSIC" },
		});

		//TODO: Add test data
		expect(a.length).toEqual(0);
	});
});