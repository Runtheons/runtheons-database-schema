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
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(150),
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING(150),
			allowNull: true,
			defaultValue: null,
		},
		dateCreation: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
		lastUpdate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
	}, {
		sequelize,
		indexes: [{
				unique: true,
				fields: ["idUser", "email"],
			},
			{
				unique: false,
				fields: ["idUser"],
			},
		],
		createdAt: "dateCreation",
		updatedAt: "lastUpdate",
		tableName: "loginmethods",
	});

	return LoginMethod;
};