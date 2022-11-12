const { Sequelize, DataTypes, Model } = require("sequelize");
const { dateFormat } = require("./../utils");

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
			get() {
				const rawValue = this.getDataValue('dateCreation');
				return dateFormat(rawValue);
			}
		},
		lastUpdate: {
			type: DataTypes.DATE,
			allowNull: false,
			get() {
				const rawValue = this.getDataValue('lastUpdate');
				return dateFormat(rawValue);
			}
		},
	}, {
		sequelize,
		indexes: [{
				unique: true,
				fields: ["idUser", "email", "type"],
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