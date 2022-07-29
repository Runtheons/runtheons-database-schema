const { Sequelize } = require("sequelize");

const loadModels = (sequelize) => {
	const Log = {};
	const User = require("./models/User")(sequelize);
	// const User = require("./models/User")(sequelize);
	// const User = require("./models/User")(sequelize);
	// const User = require("./models/User")(sequelize);

	return {
		Log: Log,
		User: User,
	};
};

const loadRelations = (models) => {
	require("./relations/User")(models);
};

const loadHooks = (models) => {
	require("./hooks/User")(models);
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
	loadRelations(models);
	loadHooks(models);

	return {...models, sequelize };
};