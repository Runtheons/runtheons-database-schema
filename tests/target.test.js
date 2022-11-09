const exec = require("./exec");

describe("TARGET", () => {
	beforeEach(async() => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async() => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
	});

	test("C - Add a target - AND type", async() => {
		const models = await require("../index")();
		const { Target, Sex, Sport, Position } = models;
		const { Op } = require("sequelize")

		let allSexs = await Sex.findAll();
		let allSports = await Sport.findAll();
		let allPositions = await Position.findAll({
			where: {
				radius: {
					[Op.ne]: null
				}
			}
		});

		let a = await Target.findAll();

		let t = await Target.create({
			type: Target.TYPE_AND,
			minAge: 20,
			maxAge: 50,
		});
		await t.setSports(allSports);
		await t.setSexs(allSexs);
		await t.setPositions(allPositions);
		await t.reload();

		let b = await Target.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add a target - OR type", async() => {
		const models = await require("../index")();
		const { Target, Sex, Sport, Position } = models;
		const { Op } = require("sequelize")

		let allSexs = await Sex.findAll();
		let allSports = await Sport.findAll();
		let allPositions = await Position.findAll({
			where: {
				radius: {
					[Op.ne]: null
				}
			}
		});

		let a = await Target.findAll();

		let t = await Target.create({
			type: Target.TYPE_OR,
			minAge: 20,
			maxAge: 50,
		});
		await t.setSports(allSports);
		await t.setSexs(allSexs);
		await t.setPositions(allPositions);
		await t.reload();

		let b = await Target.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	/*
	test("C - Add a target (checking event)", async() => {
		const models = await require("../index")();
		const { Target, Event } = models;

		let a = await Event.findAll();

		let t = await Target.create({
			minAge: 20,
			maxAge: 50,
		});

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(3);
		expect(lastEvent.type).toEqual("USER_CREATE");
		expect(lastEvent.value).toEqual(user.idUser);

	});
	*/

	test("R - Get all targets", async() => {
		const models = await require("../index")();
		const { Target } = models;

		let a = await Target.findAll();

		expect(a.length).toEqual(1);

		let b = a[0];

		expect(b.idTarget).toEqual(1);
		expect(b.minAge).toEqual(20);
		expect(b.maxAge).toEqual(50);
	});

	test("U - Update a target age range", async() => {
		const models = await require("../index")();
		const { Target } = models;

		let target = await Target.findOne({ where: { idTarget: 1 } });
		target.minAge = 35;
		target.maxAge = 40
		await target.save();

		let b = await Target.findOne({
			where: {
				idTarget: 1,
			}
		});
		expect(b.dataValues).toEqual(target.dataValues);
	});

	test("U - Update an unexisting target", async() => {
		const models = await require("../index")();
		const { Target } = models;
		try {
			let target = await Target.findOne({
				where: {
					idTarget: 5
				}
			});

			target.minAge = 20;

			await target.save();
		} catch (e) {
			expect(true).toBeTruthy();
		}
	});

});