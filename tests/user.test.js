const exec = require("./exec");

describe("USER", () => {
	beforeEach(async() => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async() => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
	});

	test("C - Add an user", async() => {
		const models = await require("../index")();
		const { User } = models;

		let a = await User.findAll();

		await User.create({
			name: "Test",
			surname: "Test",
			status: "ACTIVE",
			type: "ATHLETE",
			dateBirth: "2000-07-08",
			sex: "MALE"
		});

		let b = await User.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add an user again", async() => {
		const models = await require("../index")();
		const { User } = models;

		let a = await User.findAll();

		await User.create({
			name: "Test",
			surname: "Test",
			status: "ACTIVE",
			type: "ATHLETE",
			dateBirth: "2000-07-08",
			sex: "MALE"
		});

		let b = await User.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add an user again (checking event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.create({
			name: "Test",
			surname: "Test",
			status: "ACTIVE",
			type: "ATHLETE",
			dateBirth: "2000-07-08",
			sex: "MALE"
		});

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(3);
		expect(lastEvent.type).toEqual("USER_CREATE");
		expect(lastEvent.value).toEqual(user.idUser);
	});

	test("C - Add an existing user", async() => {
		const models = await require("../index")();
		const { User } = models;
		try {
			await User.create({
				idUser: 1,
				name: "Test",
				surname: "Test",
				status: "ACTIVE",
				type: "ATHLETE",
				dateBirth: "2000-07-08",
				sex: "MALE"
			});
		} catch (e) {
			expect(true).toBeTruthy();
		}
	});

	test("R - Get all users", async() => {
		const models = await require("../index")();
		const { User } = models;

		let a = await User.findAll();

		expect(a.length).toEqual(2);

		let b = a[0];

		expect(b.idUser).toEqual(1);
		expect(b.name).toEqual("Roberto");
		expect(b.surname).toEqual("Gallina");
		expect(b.status).toEqual("ACTIVE");
		expect(b.type).toEqual("ATHLETE");
		expect(b.dateCreation).toEqual("2022-01-01 00:00:00");
		expect(b.lastUpdate).toEqual("2022-01-01 00:00:00");
	});

	test("R - Get all users using scope", async() => {
		const models = await require("../index")();
		const { User } = models;

		let a = await User.scope(["defaultScope", "active", "athlete"]).findAll();

		expect(a.length).toEqual(1);

		let b = a[0];

		expect(b.idUser).toEqual(1);
		expect(b.name).toEqual("Roberto");
		expect(b.surname).toEqual("Gallina");
		expect(b.status).toEqual("ACTIVE");
		expect(b.type).toEqual("ATHLETE");
		expect(b.dateCreation).toEqual("2022-01-01 00:00:00");
		expect(b.lastUpdate).toEqual("2022-01-01 00:00:00");
	});

	test("U - Update an user name", async() => {
		const models = await require("../index")();
		const { User } = models;

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		user.name = "ROBERTO";

		await user.save();

		let b = await User.findOne({
			where: {
				idUser: 1,
			}
		});
		expect(b.dataValues).toEqual(user.dataValues);
	});

	test("U - Update an user name (again)", async() => {
		const models = await require("../index")();
		const { User } = models;

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		user.name = "ROBERTO";

		await user.save();

		let b = await User.findOne({
			where: {
				idUser: 1,
			}
		});
		expect(b.dataValues).toEqual(user.dataValues);
	});

	test("U - Update an user name (checking event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		user.name = "ROBERTO";

		await user.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_UPDATE_NAME");
		expect(lastEvent.value).toEqual(user.idUser);
	});

	test("U - Update an user surname (checking event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		user.surname = "GALLINA";

		await user.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_UPDATE_SURNAME");
		expect(lastEvent.value).toEqual(user.idUser);
	});

	test("U - Update an user sex (checking event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		user.sex = "FEMALE";

		await user.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_UPDATE_SEX");
		expect(lastEvent.value).toEqual(user.idUser);
	});

	test("U - Update an user dateBirth (checking event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		user.dateBirth = "2001-07-08";

		await user.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_UPDATE_DATEBIRTH");
		expect(lastEvent.value).toEqual(user.idUser);
	});

	test("U - Update an user photo (checking event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		user.photo = "./photo.png";

		await user.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_UPDATE_PHOTO");
		expect(lastEvent.value).toEqual(user.idUser);
	});

	test("U - Update an user cover (checking event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		user.cover = "./cover.png";

		await user.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_UPDATE_COVER");
		expect(lastEvent.value).toEqual(user.idUser);
	});

	test("U - Update an user biography (checking event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		user.biography = "Sono un bravo sviluppatore";

		await user.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_UPDATE_BIOGRAPHY");
		expect(lastEvent.value).toEqual(user.idUser);
	});

	test("U - Update an user title (checking event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 2
			}
		});

		user.title = "Dr.";

		await user.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(2);
		expect(lastEvent.type).toEqual("USER_UPDATE_TITLE");
		expect(lastEvent.value).toEqual(user.idUser);
	});

	test("U - Update an unexisting user", async() => {
		const models = await require("../index")();
		const { User } = models;
		try {
			let user = await User.findOne({
				where: {
					idUser: 10,
				}
			});

			user.name = "ROBERTO";

			await user.save();
		} catch (e) {
			expect(true).toBeTruthy();
		}
	});

	test("U - Mark an user as deleted (checking event)", async() => {
		const models = await require("../index")();
		const { User, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		user.status = "DELETED";

		await user.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_DELETE");
		expect(lastEvent.value).toEqual(user.idUser);
	});

});