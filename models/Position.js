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
			validate: {
				min: -90.0,
				max: 90.0,
			},
		},
		longitude: {
			type: DataTypes.FLOAT,
			validate: {
				min: -180.0,
				max: 180.0,
			},
		},
		radius: {
			type: DataTypes.FLOAT,
			allowNull: true,
			defaultValue: null,
		},
	}, {
		sequelize,
		validate: {
			bothCoordsOrNone() {
				if ((this.latitude === null) !== (this.longitude === null)) {
					throw new Error("Either both latitude and longitude, or neither!");
				}
			},
		},
		createdAt: false,
		updatedAt: false,
		tableName: "positions",
	});

	return Position;
};