const { Sequelize, DataTypes, Model } = require("sequelize");
const { dateFormat } = require("./../utils");

module.exports = (sequelize) => {
	class DiaryResult extends Model { }

	DiaryResult.init({
		idDiaryResult: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		idUser: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		idDiaryCategory: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		status: {
			type: DataTypes.ENUM(["PUBLIC", "PRIVATE"]),
			defaultValue: "PUBLIC"
		},
		description: {
			type: DataTypes.STRING(500)
		},
		resultType: {
			type: DataTypes.ENUM(["VALUE", "AVERAGE"]),
			defaultValue: "VALUE"
		},
		resultValue: {
			type: DataTypes.FLOAT,
			defaultValue: 0
		},
		resultUnit: {
			type: DataTypes.ENUM(["ms", "s", "min", "mt"]),
			defaultValue: "s"
		},
		value: {
			type: DataTypes.VIRTUAL,
			get() {
				const resultType = this.getDataValue('resultType');
				const resultValue = this.getDataValue('resultValue');
				const resultUnit = this.getDataValue('resultUnit');

				let value = resultValue + resultUnit;

				switch (resultType) {
					case "AVERAGE":
						return "Media " + value;
					case "VALUE":
					default:
						return value
				}
			}
		},
		image: {
			type: DataTypes.STRING(200)
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
		indexes: [
			{ unique: false, fields: ["idUser"] },
			{ unique: false, fields: ["idDiaryCategory"] }
		],
		createdAt: "dateCreation",
		updatedAt: "lastUpdate",
		tableName: "diaryresults",
	});

	return DiaryResult;
};