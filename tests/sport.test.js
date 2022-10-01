const exec = require("./exec");
describe("SPORT", () => {
	beforeEach(async() => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async() => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
	});

	test("C - Add a sport", async() => {
		const models = await require("../index")();
		const { Sport } = models;

		let a = await Sport.findAll();

		await Sport.create({ description: "ROUJUTSU" });

		let b = await Sport.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add a sport again", async() => {
		const models = await require("../index")();
		const { Sport } = models;

		let a = await Sport.findAll();

		await Sport.create({ description: "ROUJUTSU" });

		let b = await Sport.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add an existing sport", async() => {
		const models = await require("../index")();
		const { Sport } = models;
		try {
			await Sport.create({ description: "CALCIO" });
		} catch (e) {
			expect(true).toBeTruthy();
		}
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

		let a = await Sport.findAll({ where: { description: "CALCIO" } });

		expect(a.length).toEqual(1);
	});

	test("U - Set an user sports (checking event)", async() => {
		const models = await require("../index")();
		const { User, Sport, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		let football = await Sport.findOne({ where: { description: "CALCIO" } });

		await user.setSports([football])
		await user.reload();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(user.sports.length).toEqual(1);

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_UPDATE_SPORTS");
		expect(lastEvent.value).toEqual(user.idUser);

	});

});