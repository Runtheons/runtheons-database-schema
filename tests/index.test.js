describe("CONNECTION", () => {
	test("With correct data", async() => {
		const result = await require("../index")();
		expect(result).not.toBeFalsy();
	});

	test("With incorrect data", async() => {
		const result = await require("../index")({
			host: "0.0.0.0",
			username: "root",
			password: "password",
			database: "runtheons-test",
			dialect: "mysql",
			logging: false,
		});
		expect(result).toBeFalsy();
	});
});