const { Sequelize, DataTypes, Model } = require("sequelize");

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
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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