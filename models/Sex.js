const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class Sex extends Model {
		static MALE = "MALE";
		static FEMALE = "FEMALE";
		static NOT_BINARY = "NOT BINARY";
		static PANGENDER = "PANGENDER";
		static BIGENDER = "BIGENDER";
		static GENDER_FLUID = "GENDER FLUID";
		static NOT_SPECIFIED = "NOT SPECIFIED";
	}

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