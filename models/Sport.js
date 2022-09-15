const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class Sport extends Model {}

	Sport.init({
		idSport: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	}, {
		sequelize,
		createdAt: false,
		updatedAt: false,
		tableName: "sport",
	});

	return Sport;
};