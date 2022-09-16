const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class Sport extends Model {}

	Sport.init({
		idSport: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		description: {
			type: DataTypes.STRING(150),
			unique: true,
		},
	}, {
		sequelize,
		createdAt: false,
		updatedAt: false,
		tableName: "sports",
	});

	return Sport;
};