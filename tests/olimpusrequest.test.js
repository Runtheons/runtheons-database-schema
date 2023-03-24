const exec = require("./exec");

describe("OLIMPUSREQUEST", () => {
	beforeEach(async () => {
		await exec("sequelize db:migrate --config ./tests/config.json --env db");
		await exec("sequelize db:seed:all --config ./tests/config.json --env db");
	});

	afterEach(async () => {
		await exec("sequelize db:migrate:undo:all --config ./tests/config.json --env db");
	});

	test("C - Create an olimpusrequest as invite", async () => {
		const models = await require("../index")();
		const { OlimpusRequest } = models;

		let a = await OlimpusRequest.findAll();

		let olimpusRequest = await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "INVITED",
			message: "Join my olimpus"
		});

		let b = await OlimpusRequest.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create an olimpusrequest as invite (again)", async () => {
		const models = await require("../index")();
		const { OlimpusRequest } = models;

		let a = await OlimpusRequest.findAll();

		let olimpusRequest = await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "INVITED",
			message: "Join my olimpus"
		});

		let b = await OlimpusRequest.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create an olimpusrequest as invite (checking event)", async () => {
		const models = await require("../index")();
		const { OlimpusRequest, Event } = models;

		let a = await Event.findAll();

		let olimpusRequest = await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "INVITED",
			message: "Join my olimpus"
		});

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("OLIMPUSREQUEST_CREATE");
		expect(lastEvent.value).toEqual(olimpusRequest.idOlimpusRequest);
	});

	test("C - Create an olimpusrequest as request", async () => {
		const models = await require("../index")();
		const { OlimpusRequest } = models;

		let a = await OlimpusRequest.findAll();

		let olimpusRequest = await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "REQUEST",
			message: "Can you add to your olimpus"
		});

		let b = await OlimpusRequest.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create an olimpusrequest as request (again)", async () => {
		const models = await require("../index")();
		const { OlimpusRequest } = models;

		let a = await OlimpusRequest.findAll();

		let olimpusRequest = await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "REQUEST",
			message: "Can you add to your olimpus"
		});

		let b = await OlimpusRequest.findAll();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create an olimpusrequest as request (checking event)", async () => {
		const models = await require("../index")();
		const { OlimpusRequest, Event } = models;

		let a = await Event.findAll();

		let olimpusRequest = await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "REQUEST",
			message: "Can you add to your olimpus"
		});

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(2);
		expect(lastEvent.type).toEqual("OLIMPUSREQUEST_CREATE");
		expect(lastEvent.value).toEqual(olimpusRequest.idOlimpusRequest);
	});

	test("R - Get all olimpusrequest invite", async () => {
		const models = await require("../index")();

		const { OlimpusRequest } = models;

		// A invited B
		let olimpusRequest = await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "INVITED"
		});

		let a = await OlimpusRequest.scope(["defaultScope", "invited"])
			.findAll({
				where: {
					idUserB: 2
				}
			});

		expect(a.length).toEqual(1);

		let b = a[0];

		expect(b.idOlimpusRequest).toEqual(olimpusRequest.idOlimpusRequest);
		expect(b.owner.idUser).toEqual(1);
		expect(b.user.idUser).toEqual(2);
		expect(b.dateCreation).toEqual(olimpusRequest.dateCreation);
		expect(b.lastUpdate).toEqual(olimpusRequest.lastUpdate);
	});

	test("R - Get all olimpusrequest request", async () => {
		const models = await require("../index")();

		const { OlimpusRequest } = models;

		// A requested B
		let olimpusRequest = await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "REQUESTED"
		});

		let a = await OlimpusRequest.scope(["defaultScope", "requested"])
			.findAll({
				where: {
					idUserA: 1
				}
			});

		expect(a.length).toEqual(1);

		let b = a[0];

		expect(b.idOlimpusRequest).toEqual(olimpusRequest.idOlimpusRequest);
		expect(b.owner.idUser).toEqual(1);
		expect(b.user.idUser).toEqual(2);
		expect(b.dateCreation).toEqual(olimpusRequest.dateCreation);
		expect(b.lastUpdate).toEqual(olimpusRequest.lastUpdate);
	});

	test("R - Get all olimpusrequest connect", async () => {
		const models = await require("../index")();

		const { OlimpusRequest } = models;

		// A is connect to B
		let olimpusRequest = await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "CONNECT"
		});

		let a = await OlimpusRequest.scope(["defaultScope", "connect"])
			.findAll({
				where: {
					idUserA: 1
				}
			});

		expect(a.length).toEqual(1);

		let b = a[0];

		expect(b.idOlimpusRequest).toEqual(olimpusRequest.idOlimpusRequest);
		expect(b.owner.idUser).toEqual(1);
		expect(b.user.idUser).toEqual(2);
		expect(b.dateCreation).toEqual(olimpusRequest.dateCreation);
		expect(b.lastUpdate).toEqual(olimpusRequest.lastUpdate);
	});

	test("U - Accept an olimpusrequest invite (checking event)", async () => {
		const models = await require("../index")();

		const { OlimpusRequest, Event } = models;

		// A invited B
		await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "INVITED"
		});

		let a = await Event.findAll();

		let olimpusRequest = await OlimpusRequest.findOne();

		olimpusRequest.status = "CONNECT";
		await olimpusRequest.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(2);
		expect(lastEvent.type).toEqual("OLIMPUSREQUEST_UPDATE");
		expect(lastEvent.value).toEqual(olimpusRequest.idOlimpusRequest);
	});

	test("U - Accept an olimpusrequest request (checking event)", async () => {
		const models = await require("../index")();

		const { OlimpusRequest, Event } = models;

		// A invited B
		await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "REQUESTED"
		});

		let a = await Event.findAll();

		let olimpusRequest = await OlimpusRequest.findOne();

		olimpusRequest.status = "CONNECT";
		await olimpusRequest.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("OLIMPUSREQUEST_UPDATE");
		expect(lastEvent.value).toEqual(olimpusRequest.idOlimpusRequest);
	});

	test("D - Reject an olimpusrequest invite (checking event)", async () => {
		const models = await require("../index")();

		const { OlimpusRequest, Event } = models;

		// A invited B
		await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "INVITED"
		});

		let a = await Event.findAll();

		let olimpusRequest = await OlimpusRequest.findOne();

		olimpusRequest.status = "REJECTED";
		await olimpusRequest.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(2);
		expect(lastEvent.type).toEqual("OLIMPUSREQUEST_DELETE");
		expect(lastEvent.value).toEqual(olimpusRequest.idOlimpusRequest);
	});

	test("D - Refuse an olimpusrequest request (checking event)", async () => {
		const models = await require("../index")();

		const { OlimpusRequest, Event } = models;

		// A invited B
		await OlimpusRequest.create({
			idUserA: 1,
			idUserB: 2,
			status: "REQUESTED"
		});

		let a = await Event.findAll();

		let olimpusRequest = await OlimpusRequest.findOne();

		olimpusRequest.status = "REFUSED";
		await olimpusRequest.save();

		let b = await Event.findAll();
		expect(b.length).toEqual(a.length + 1);

		let lastEvent = b[b.length - 1];

		expect(lastEvent.idUser).toEqual(1);
		expect(lastEvent.type).toEqual("OLIMPUSREQUEST_DELETE");
		expect(lastEvent.value).toEqual(olimpusRequest.idOlimpusRequest);
	});

});