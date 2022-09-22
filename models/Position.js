const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class Position extends Model {}

	Position.init({
		idPosition: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		latitude: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				min: -90.0,
				max: 90.0,
			},
		},
		longitude: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				min: -180.0,
				max: 180.0,
			},
		},
		addressName: {
			type: DataTypes.STRING(200),
			allowNull: true,
		},
		radius: {
			type: DataTypes.FLOAT,
			allowNull: true,
			defaultValue: null,
		}
	}, {
		sequelize,
		createdAt: false,
		updatedAt: false,
		tableName: "positions",
	});

	return Position;
};