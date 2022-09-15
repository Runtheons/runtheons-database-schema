const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class Sport extends Model {}

	Sport.init({
		idSport: {
			type: DataTypes.STRING(150),
			primaryKey: true,
		},
	}, {
		sequelize,
		createdAt: false,
		updatedAt: false,
		tableName: "sports",
	});

	return Sport;
};