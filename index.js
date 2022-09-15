const { Sequelize } = require("sequelize");

const loadModels = (sequelize) => {
	const Event = require("./models/Event")(sequelize);
	const Speciality = require("./models/Speciality")(sequelize);
	// const Log = {};
	// const User = require("./models/User")(sequelize);
	// const LoginMethods = require("./models/LoginMethod")(sequelize);
	// const User = require("./models/User")(sequelize);
	// const User = require("./models/User")(sequelize);

	return {
		Event,
		Speciality,
	};
};

const loadRelationships = (models) => {
	// require("./relationships/User")(models);
};

const loadHooks = (models) => {
	// require("./hooks/User")(models);
};

let defaultConfig = require("./tests/config.json");

module.exports = async(config = defaultConfig.db) => {
	const sequelize = new Sequelize(config);

	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}

	const models = loadModels(sequelize);
	loadRelationships(models);
	loadHooks(models);

	return {...models, sequelize };
};