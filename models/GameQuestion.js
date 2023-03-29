const { Sequelize, DataTypes, Model } = require("sequelize");
const { dateFormat } = require("./../utils");

module.exports = (sequelize) => {
	class GameQuestion extends Model { }

	GameQuestion.init({
		idGameQuestion: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		idUser: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		idSpeciality: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		image: {
			type: DataTypes.STRING(200),
		},
		question: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		optionA: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		optionB: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		optionC: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		optionD: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		correct: {
			type: DataTypes.ENUM(["A", "B", "C", "D"]),
			allowNull: false
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
			fields: ["idUser"],
		}, {
			unique: false,
			fields: ["idSpeciality"],
		}],
		createdAt: "dateCreation",
		updatedAt: "lastUpdate",
		tableName: "gamequestions",
	});

	return GameQuestion;
};