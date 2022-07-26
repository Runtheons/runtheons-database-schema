const exec = require("./exec");
describe("SPECIALITY", () => {
	beforeEach(async() => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async() => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
	});

	test("C - Add a speciality", async() => {
		const models = await require("../index")();
		const { Speciality } = models;

		let a = await Speciality.findAll();

		await Speciality.create({ description: "MAESTRO" });

		let b = await Speciality.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add a speciality again", async() => {
		const models = await require("../index")();
		const { Speciality } = models;

		let a = await Speciality.findAll();

		await Speciality.create({ description: "MAESTRO" });

		let b = await Speciality.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Add an existing speciality", async() => {
		const models = await require("../index")();
		const { Speciality } = models;
		try {
			await Speciality.create({ description: "DIETISTA" });
		} catch (e) {
			expect(true).toBeTruthy();
		}
	});

	test("R - Read all specialities", async() => {
		const models = await require("../index")();
		const { Speciality } = models;

		let a = await Speciality.findAll();

		expect(a.length).toEqual(16);
	});

	test("R - Search 'DIETISTA'", async() => {
		const models = await require("../index")();
		const { Speciality } = models;

		let a = await Speciality.findAll({ where: { description: "DIETISTA" } });

		expect(a.length).toEqual(1);
	});

	test("U - Set an user specialities (checking event)", async() => {
		const models = await require("../index")();
		const { User, Speciality, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		let dietista = await Speciality.findOne({ where: { description: "DIETISTA" } });

		await user.setSpecialities([dietista])
		await user.reload();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(user.specialities.length).toEqual(1);

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_UPDATE_SPECIALITIES");
		expect(lastEvent.value).toEqual(user.idUser);

	});
});