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
		await t.reload();

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
		await t.reload();

		await t.setSports(allSports);
		await t.setSexs(allSexs);
		await t.setPositions(allPositions);
		await t.reload();

		let b = await Target.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create a professionist target (checking event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.scope(["defaultScope", "active", "professionist"]).findOne({ where: { idUser: 3 } });
		let target = await user.createTarget({
			minAge: 20,
			maxAge: 50,
		});

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(3);
		expect(lastEvent.type).toEqual("TARGET_CREATE");
		expect(lastEvent.value).toEqual(target.idTarget);
	});

	test("R - Get all targets", async() => {
		const models = await require("../index")();
		const { Target } = models;

		let a = await Target.findAll();

		expect(a.length).toEqual(1);

		let b = a[0];

		expect(b.idTarget).toEqual(1);
		expect(b.minAge).toEqual(20);
		expect(b.maxAge).toEqual(50);
		expect(b.dateCreation).toEqual("2022-01-01 00:00:00");
		expect(b.lastUpdate).toEqual("2022-01-01 00:00:00");
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

	test("U - Update a professionist target age range (check event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.scope(["defaultScope", "active", "professionist"]).findOne({ where: { idUser: 2 } });

		user.target.minAge = 25;
		await user.target.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(2);
		expect(lastEvent.type).toEqual("TARGET_UPDATE_AGERANGE");
		expect(lastEvent.value).toEqual(user.target.idTarget);
	});

	test("U - Update a professionist target age range (check event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.scope(["defaultScope", "active", "professionist"]).findOne({ where: { idUser: 2 } });

		user.target.maxAge = 65;
		await user.target.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(2);
		expect(lastEvent.type).toEqual("TARGET_UPDATE_AGERANGE");
		expect(lastEvent.value).toEqual(user.target.idTarget);
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

	test("U - Update a professionist target", async() => {
		const models = await require("../index")();
		const { User, Target } = models;

		let user = await User.scope(["defaultScope", "active", "professionist"]).findOne({ where: { idUser: 2 } });

		user.target.minAge = 35;
		user.target.maxAge = 40
		await user.target.save();

		let b = await Target.findOne({
			where: {
				idTarget: 1,
			}
		});
		expect(b.dataValues).toEqual(user.target.dataValues);
	});

	test("U - Update a professionist target sports (check event)", async() => {
		const models = await require("../index")();
		const { User, Event, Sport } = models;

		let a = await Event.findAll();

		let user = await User.scope(["defaultScope", "active", "professionist"]).findOne({ where: { idUser: 2 } });

		let sports = await Sport.findAll();

		await user.target.setSports(sports);

		await user.target.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(2);
		expect(lastEvent.type).toEqual("TARGET_UPDATE_SPORTS");
		expect(lastEvent.value).toEqual(user.target.idTarget);

	});

	test("U - Update a professionist target sexs (check event)", async() => {
		const models = await require("../index")();
		const { User, Event, Sex } = models;

		let a = await Event.findAll();

		let user = await User.scope(["defaultScope", "active", "professionist"]).findOne({ where: { idUser: 2 } });

		let sexs = await Sex.findAll();

		await user.target.setSexs(sexs);

		await user.target.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(2);
		expect(lastEvent.type).toEqual("TARGET_UPDATE_SEXS");
		expect(lastEvent.value).toEqual(user.target.idTarget);

	});

	test("U - Update a professionist target positions (check event)", async() => {
		const models = await require("../index")();
		const { User, Event, Position } = models;
		const { Op } = require("sequelize")

		let a = await Event.findAll();

		let user = await User.scope(["defaultScope", "active", "professionist"]).findOne({ where: { idUser: 2 } });

		let positions = await Position.findAll({
			where: {
				radius: {
					[Op.ne]: null
				}
			}
		});

		await user.target.setPositions(positions);

		await user.target.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(2);
		expect(lastEvent.type).toEqual("TARGET_UPDATE_POSITIONS");
		expect(lastEvent.value).toEqual(user.target.idTarget);
	});


});