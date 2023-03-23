const { Sequelize } = require("sequelize");

const loadModels = (sequelize) => {
	const Event = require("./models/Event")(sequelize);
	const Sport = require("./models/Sport")(sequelize);
	const Goal = require("./models/Goal")(sequelize);
	const Speciality = require("./models/Speciality")(sequelize);
	const LoginMethod = require("./models/LoginMethod")(sequelize);
	const Position = require("./models/Position")(sequelize);
	const Sex = require("./models/Sex")(sequelize);
	const User = require("./models/User")(sequelize, { Sex });
	const Target = require("./models/Target")(sequelize);

	const DiaryCategory = require("./models/DiaryCategory")(sequelize);
	const DiaryResult = require("./models/DiaryResult")(sequelize);

	const OlimpusRequest = require("./models/OlimpusRequest")(sequelize);

	return {
		Event,
		Sport,
		Goal,
		Speciality,
		LoginMethod,
		Position,
		Sex,
		User,
		Target,
		DiaryCategory,
		DiaryResult,
		OlimpusRequest
	};
};

const loadRelationships = (models) => {
	require("./relationships/User")(models);
	require("./relationships/Sport")(models);
	require("./relationships/Goal")(models);
	require("./relationships/Speciality")(models);
	require("./relationships/Position")(models);
	require("./relationships/Sex")(models);
	require("./relationships/Target")(models);
	require("./relationships/DiaryCategory")(models);
	require("./relationships/DiaryResult")(models);
	require("./relationships/OlimpusRequest")(models);
};

const loadHooks = (models) => {
	require("./hooks/LoginMethod")(models);
	require("./hooks/User")(models);
	require("./hooks/Target")(models);
	require("./hooks/DiaryResult")(models);
	require("./hooks/OlimpusRequest")(models);
};

let defaultConfig = require("./tests/config.json");

module.exports = async (config = defaultConfig.db) => {
	const sequelize = new Sequelize(config);

	try {
		await sequelize.authenticate();
		// console.log("Connection has been established successfully.");
	} catch (error) {
		return false;
		// console.error("Unable to connect to the database:", error);
	}

	const models = loadModels(sequelize);
	loadRelationships(models);
	loadHooks(models);

	return { ...models, sequelize };
};