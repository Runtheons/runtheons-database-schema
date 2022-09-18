const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class Goal extends Model {}

	Goal.init({
		idGoal: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		type: {
			type: DataTypes.ENUM(["ATHLETE", "PROFESSIONIST"]),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(150),
			unique: true,
		},
	}, {
		sequelize,
		indexes: [{ unique: false, fields: ["type"] }],
		createdAt: false,
		updatedAt: false,
		tableName: "goals",
	});

	return Goal;
};