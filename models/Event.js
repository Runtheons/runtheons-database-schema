const { Sequelize, DataTypes, Model } = require("sequelize");
const { dateFormat } = require("./../utils");


module.exports = (sequelize) => {
	class Event extends Model {}

	Event.init({
		idEvent: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		idUser: {
			type: DataTypes.INTEGER,
		},
		datetime: {
			type: DataTypes.DATE,
			allowNull: false,
			get() {
				const rawValue = this.getDataValue('datetime');
				return dateFormat(rawValue);
			}
		},
		type: {
			type: DataTypes.ENUM(["USER_CREATION"]),
			allowNull: false,
		},
		value: {
			type: DataTypes.INTEGER,
		},
		old: {
			type: DataTypes.STRING(5000),
			allowNull: true,
		},
		new: {
			type: DataTypes.STRING(5000),
			allowNull: true,
		},
	}, {
		sequelize,
		indexes: [{ unique: false, fields: ["idUser"] }],
		createdAt: "datetime",
		updatedAt: false,
		tableName: "events",
	});

	return Event;
};