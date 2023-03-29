const { Sequelize, DataTypes, Model } = require("sequelize");
const { dateFormat } = require("./../utils");

module.exports = (sequelize) => {
	class GameAnser extends Model { }

	GameAnser.init({
		idGameAnser: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		idUser: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		idGameQuestion: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		dateCreation: {
			type: DataTypes.DATE,
			allowNull: false,
			get() {
				const rawValue = this.getDataValue('dateCreation');
				return dateFormat(rawValue);
			}
		}
	}, {
		sequelize,
		indexes: [{
			unique: false,
			fields: ["idUser"],
		}, {
			unique: false,
			fields: ["idGameQuestion"],
		}],
		createdAt: "dateCreation",
		updatedAt: false,
		tableName: "gameansers",
	});

	return GameAnser;
};