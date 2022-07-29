describe("AA", () => {
	// var db = null;

	// beforeEach(async() => {
	// 	let { sequelize } = await require("../index")();
	// 	db = sequelize;
	// 	await db.sync({ force: true });
	// });

	// afterEach(async() => {
	// 	jest.clearAllMocks();
	// });

	test("Whuold return a 404", async() => {
		const models = await require("../index")();
		const { User } = models;

		let a = await User.findAll();

		console.log(models);
		expect(1).toEqual(1);
	});
});