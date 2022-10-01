const exec = require("./exec");
describe("GOAL", () => {
	beforeEach(async() => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async() => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
	});

	test("C - Add an athlete goal", async() => {
		const models = await require("../index")();
		const { Goal } = models;

		let a = await Goal.findAll();

		await Goal.create({ type: "ATHLETE", description: "MIGLIORARE" });

		let b = await Goal.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add a professionist goal", async() => {
		const models = await require("../index")();
		const { Goal } = models;

		let a = await Goal.findAll();

		await Goal.create({ type: "PROFESSIONIST", description: "MIGLIORARE" });

		let b = await Goal.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add an existing goal", async() => {
		const models = await require("../index")();
		const { Goal } = models;
		try {
			await Goal.create({
				type: "PROFESSIONIST",
				description: "TROVARE NUOVI CLIENTI",
			});
		} catch (e) {
			expect(true).toBeTruthy();
		}
	});

	test("R - Read all goals", async() => {
		const models = await require("../index")();
		const { Goal } = models;

		let a = await Goal.findAll();

		expect(a.length).toEqual(27);
	});

	test("R - Search 'TROVARE NUOVI CLIENTI'", async() => {
		const models = await require("../index")();
		const { Goal } = models;

		let a = await Goal.findAll({
			where: { description: "TROVARE NUOVI CLIENTI" },
		});

		expect(a.length).toEqual(1);
		expect(a[0].type).toEqual("PROFESSIONIST");
	});

	test("R - Search 'LA MIA ANSIA PRE GARA'", async() => {
		const models = await require("../index")();
		const { Goal } = models;

		let a = await Goal.findAll({
			where: { description: "LA MIA ANSIA PRE GARA" },
		});

		expect(a.length).toEqual(1);
		expect(a[0].type).toEqual("ATHLETE");
	});

	test("U - Set an user goal (checking event)", async() => {
		const models = await require("../index")();
		const { User, Goal, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		let goal = await Goal.findOne({ where: { description: "TROVARE NUOVI CLIENTI" }, });

		await user.setGoals([goal])
		await user.reload();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(user.goals.length).toEqual(1);

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_UPDATE_GOALS");
		expect(lastEvent.value).toEqual(user.idUser);

	});

});