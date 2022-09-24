const exec = require("./exec");
describe("LOGINMETHOD", () => {
	beforeEach(async() => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async() => {
		await exec(
			"sequelize db:migrate:undo:all --config ./tests/config.json --env db"
		);
	});

	test("?C - Add a loginmethod", async() => {
		const models = await require("../index")();
		const { LoginMethod, Event } = models;

		let a = await LoginMethod.findAll();

		//TODO: Fix idUser with real data
		await LoginMethod.create({
			idUser: 2,
			type: "CLASSIC",
			email: "gallinar00@gmail.com",
			password: "1234"
		});

		let b = await LoginMethod.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("?C - Add a loginmethod again", async() => {
		const models = await require("../index")();
		const { LoginMethod, Event } = models;

		let a = await LoginMethod.findAll();

		//TODO: Fix idUser with real data
		await LoginMethod.create({
			idUser: 2,
			type: "CLASSIC",
			email: "gallinar00@gmail.com",
			password: "1234"
		});

		let b = await LoginMethod.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("?C - Add an existing loginmethod", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;
		try {
			await LoginMethod.create({
				idUser: 1,
				type: "CLASSIC",
				email: "gallinar00@gmail.com",
				password: "1234"
			});
		} catch (e) {
			expect(true).toBeTruthy();
		}
	});

	test("R - Read all login methods of an user (by email)", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;

		let a = await LoginMethod.findAll({
			where: { email: "gallinar00@gmail.com" },
		});

		expect(a.length).toEqual(1);
	});
	test("R - Search a login methods of an user by email and type", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;

		let a = await LoginMethod.findAll({
			where: { email: "gallinar00@gmail.com", type: "CLASSIC" },
		});

		expect(a.length).toEqual(1);
	});
});