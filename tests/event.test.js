describe("EVENT", () => {
	var db = null;

	beforeEach(async() => {
		let { sequelize } = await require("../index")();
		db = sequelize;
		await db.sync({ force: true });
	});

	afterEach(async() => {
		jest.clearAllMocks();
	});

	test("R - Read all event", async() => {
		const models = await require("../index")();
		const { Event } = models;

		let a = await Event.findAll();

		expect(a.length).toEqual(0);
	});

	// test("Create an user", async() => {
	// 	const models = await require("../index")();
	// 	const { User } = models;

	// 	let a = await User.findAll();
	// 	expect(a.length).toEqual(0);

	// 	await User.create({ email: "aaa@aaa.com" });

	// 	a = await User.findAll();
	// 	expect(a.length).toEqual(1);
	// });

	// test("Create an user BB", async() => {
	// 	const models = await require("../index")();
	// 	const { User } = models;

	// 	let a = await User.findAll();
	// 	expect(a.length).toEqual(0);

	// 	await User.create({ email: "aaa@aaa.com" });

	// 	a = await User.findAll();
	// 	expect(a.length).toEqual(1);
	// });
});