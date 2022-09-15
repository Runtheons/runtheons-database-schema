const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class Speciality extends Model {}

	Speciality.init({
		idSpeciality: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	}, {
		sequelize,
		createdAt: false,
		updatedAt: false,
		tableName: "specialities",
	});

	return Speciality;
};