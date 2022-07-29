const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class User extends Model {}

	User.init({
		idUser: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING(150),
			allowNull: false,
			unique: true,
		},
		dateCreation: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
		lastUpdate: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
	}, {
		sequelize,
		createdAt: "dateCreation",
		updatedAt: "lastUpdate",
		tableName: "users",
	});

	return User;
};