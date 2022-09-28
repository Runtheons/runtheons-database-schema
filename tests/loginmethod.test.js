const exec = require("./exec");
describe("LOGINMETHOD", () => {
	beforeEach(async() => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async() => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
	});

	test("C - Add a loginmethod", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;

		let a = await LoginMethod.findAll();

		await LoginMethod.create({
			idUser: 2,
			type: "CLASSIC",
			email: "gallinar00@gmail.com",
			password: "1234"
		});

		let b = await LoginMethod.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add a loginmethod again", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;

		let a = await LoginMethod.findAll();

		await LoginMethod.create({
			idUser: 2,
			type: "CLASSIC",
			email: "gallinar00@gmail.com",
			password: "1234"
		});

		let b = await LoginMethod.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add a loginmethod (checking event)", async() => {
		const models = await require("../index")();
		const { LoginMethod, Event } = models;

		let a = await Event.findAll();

		let loginMethod = await LoginMethod.create({
			idUser: 2,
			type: "CLASSIC",
			email: "gallinar00@gmail.com",
			password: "1234"
		});

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(2);
		expect(lastEvent.type).toEqual("LOGINMETHOD_CREATE");
		expect(lastEvent.value).toEqual(loginMethod.idLoginMethod);
	});

	test("C - Add an existing loginmethod", async() => {
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

	test("R - Get all login methods of an user (by email)", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;

		let a = await LoginMethod.findAll({
			where: { email: "gallinar00@gmail.com" },
		});

		expect(a.length).toEqual(1);

		let b = a[0];

		expect(b.idUser).toEqual(1);
		expect(b.type).toEqual("CLASSIC");
		expect(b.email).toEqual("gallinar00@gmail.com");
		expect(b.password).toEqual("123456", );
		expect(b.dateCreation).toEqual("2022-01-01 00:00:00");
		expect(b.lastUpdate).toEqual("2022-01-01 00:00:00");
	});

	test("R - Search a login methods of an user by email and type", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;

		let a = await LoginMethod.findAll({
			where: { email: "gallinar00@gmail.com", type: "CLASSIC" },
		});

		expect(a.length).toEqual(1);
	});

	test("U - Update a loginmethod password", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;

		let loginMethod = await LoginMethod.findOne({
			where: {
				idUser: 1,
				email: "gallinar00@gmail.com"
			}
		});

		loginMethod.password = "5678";

		await loginMethod.save();

		let b = await LoginMethod.findOne({
			where: {
				idUser: 1,
				email: "gallinar00@gmail.com"
			}
		});
		expect(b.dataValues).toEqual(loginMethod.dataValues);
	});

	test("U - Update a loginmethod password (again)", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;

		let loginMethod = await LoginMethod.findOne({
			where: {
				idUser: 1,
				email: "gallinar00@gmail.com"
			}
		});

		loginMethod.password = "5678";

		await loginMethod.save();

		let b = await LoginMethod.findOne({
			where: {
				idUser: 1,
				email: "gallinar00@gmail.com"
			}
		});
		expect(b.dataValues).toEqual(loginMethod.dataValues);
	});

	test("U - Update a loginmethod password (checking event)", async() => {
		const models = await require("../index")();
		const { LoginMethod, Event } = models;

		let a = await Event.findAll();

		let loginMethod = await LoginMethod.findOne({
			where: {
				idUser: 1,
				email: "gallinar00@gmail.com"
			}
		});

		loginMethod.password = "5678";

		await loginMethod.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("LOGINMETHOD_UPDATE");
		expect(lastEvent.value).toEqual(loginMethod.idLoginMethod);
	});

	test("U - Update an unexisting loginmethod", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;
		try {
			let loginMethod = await LoginMethod.findOne({
				where: {
					idUser: 2,
					email: "gallinar00@gmail.com"
				}
			});

			loginMethod.password = "5678";

			await loginMethod.save();
		} catch (e) {
			expect(true).toBeTruthy();
		}
	});

	test("D - Delete a loginmethod", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;

		let loginMethod = await LoginMethod.findOne({
			where: {
				idUser: 1,
				email: "gallinar00@gmail.com"
			}
		});

		await loginMethod.destroy();

		let b = await LoginMethod.findOne({
			where: {
				idUser: 1,
				email: "gallinar00@gmail.com"
			}
		});
		expect(b).toEqual(null);
	});

	test("D - Delete a loginmethod (again)", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;

		let loginMethod = await LoginMethod.findOne({
			where: {
				idUser: 1,
				email: "gallinar00@gmail.com"
			}
		});

		await loginMethod.destroy();

		let b = await LoginMethod.findOne({
			where: {
				idUser: 1,
				email: "gallinar00@gmail.com"
			}
		});
		expect(b).toEqual(null);
	});

	test("D - Delete a loginmethod (checking event)", async() => {
		const models = await require("../index")();
		const { LoginMethod, Event } = models;

		let a = await Event.findAll();

		let loginMethod = await LoginMethod.findOne({
			where: {
				idUser: 1,
				email: "gallinar00@gmail.com"
			}
		});

		await loginMethod.destroy();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("LOGINMETHOD_DELETE");
		expect(lastEvent.value).toEqual(loginMethod.idLoginMethod);
	});

	test("D - Delete an unexisting loginmethod", async() => {
		const models = await require("../index")();
		const { LoginMethod } = models;
		try {
			let loginMethod = await LoginMethod.findOne({
				where: {
					idUser: 2,
					email: "gallinar00@gmail.com"
				}
			});

			await loginMethod.destroy();
		} catch (e) {
			expect(true).toBeTruthy();
		}
	});

});