const { Sequelize, DataTypes, Model } = require("sequelize");
const { dateFormat } = require("./../utils");

module.exports = (sequelize) => {
	class Target extends Model {
		static TYPE_AND = 'AND';
		static TYPE_OR = 'OR';
	}

	Target.init({
		idTarget: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		type: {
			type: DataTypes.ENUM(["AND", "OR"]),
			defaultValue: "OR",
			allowNull: false,
		},
		minAge: {
			type: DataTypes.INTEGER,
			defaultValue: 13,
			allowNull: false,
		},
		maxAge: {
			type: DataTypes.INTEGER,
			defaultValue: 40,
			allowNull: false,
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
		createdAt: "dateCreation",
		updatedAt: "lastUpdate",
		tableName: "targets",
	});

	return Target;
};