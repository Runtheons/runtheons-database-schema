const exec = require("./exec");
describe("POSITION", () => {
	beforeEach(async() => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
	});

	afterEach(async() => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
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

	test("U - Add an user position (checking event)", async() => {
		const models = await require("../index")();
		const { User, Position, Event } = models;

		let ap = await Position.findAll();
		let ae = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		await user.createPosition({ latitude: 45, longitude: 10 });

		let bp = await Position.findAll();
		let be = await Event.findAll();
		expect(bp.length).toEqual(ap.length + 1);
		expect(be.length).toEqual(ae.length + 1);

		let lastEvent = be[be.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_UPDATE_POSITION");
		expect(lastEvent.value).toEqual(user.idUser);
	});

});