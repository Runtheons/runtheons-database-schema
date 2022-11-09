const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class Sex extends Model {}

	Sex.init({
		idSex: {
			type: DataTypes.STRING(50),
			primaryKey: true,
		}
	}, {
		sequelize,
		createdAt: false,
		updatedAt: false,
		tableName: "sexs",
	});

	return Sex;
};