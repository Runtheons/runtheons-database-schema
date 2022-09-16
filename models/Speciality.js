const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class Speciality extends Model {}

	Speciality.init({
		idSpeciality: {
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
		tableName: "specialities",
	});

	return Speciality;
};