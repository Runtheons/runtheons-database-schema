const exec = require("./exec");
describe("SEX", () => {
	beforeEach(async() => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async() => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
	});

	test("R - Read all sex", async() => {
		const models = await require("../index")();
		const { Sex } = models;

		let a = await Sex.findAll();

		expect(a.length).toEqual(7);
	});

	test("R - Search 'MALE'", async() => {
		const models = await require("../index")();
		const { Sex } = models;

		let a = await Sex.findAll({
			where: { idSex: "MALE" },
		});

		expect(a.length).toEqual(1);
	});

	test("U - Set an user sex (checking event)", async() => {
		const models = await require("../index")();
		const { User, Sex, Event } = models;

		let a = await Event.findAll();

		let user = await User.findOne({
			where: {
				idUser: 1
			}
		});

		await user.setSex(Sex.FEMALE)
		await user.reload();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("USER_UPDATE_SEX");
		expect(lastEvent.value).toEqual(user.idUser);

	});

});