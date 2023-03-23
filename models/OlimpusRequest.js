const { Sequelize, DataTypes, Model } = require("sequelize");
const { dateFormat } = require("./../utils");

module.exports = (sequelize) => {
	class OlimpusRequest extends Model { }

	OlimpusRequest.init({
		idOlimpusRequest: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		idUserA: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		idUserB: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		status: {
			type: DataTypes.ENUM(["INVITED", "CONNECT", "REJECTED", "DELETED"]),
			allowNull: false
		},
		message: {
			type: DataTypes.STRING(500)
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
			unique: false,
			fields: ["idUserA"],
		}, {
			unique: false,
			fields: ["idUserB"],
		},],
		createdAt: "dateCreation",
		updatedAt: "lastUpdate",
		tableName: "olimpusrequests",
	});

	return OlimpusRequest;
};