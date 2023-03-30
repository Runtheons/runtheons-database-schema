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
		idUserOwner: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		idUser: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		status: {
			type: DataTypes.ENUM([
				"INVITED", 	// A invited B
				"REQUESTED",// B request A to add he
				"CONNECT", 	// A and B are connect
				"REJECTED", // B reject the invite of A
				"REFUSED", 	// A reject to add B
				"DELETED",  // A remove B
			]),
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
			fields: ["idUserOwner"],
		}, {
			unique: false,
			fields: ["idUser"],
		},],
		createdAt: "dateCreation",
		updatedAt: "lastUpdate",
		tableName: "olimpusrequests",
	});

	return OlimpusRequest;
};