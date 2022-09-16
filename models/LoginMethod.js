const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class LoginMethod extends Model {}

	LoginMethod.init({
		idLoginMethod: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		idUser: {
			type: DataTypes.INTEGER,
		},
		type: {
			type: DataTypes.ENUM(["CLASSIC"]),
		},
		email: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(150),
			allowNull: true,
			defaultValue: null,
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
		indexes: [{
			unique: true,
			fields: ["idUser", "email"],
		}, ],
		createdAt: "dateCreation",
		updatedAt: "lastUpdate",
		tableName: "loginmethods",
	});

	return LoginMethod;
};