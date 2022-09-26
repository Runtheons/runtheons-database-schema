const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class User extends Model {}

	User.init({
		idUser: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		status: {
			type: DataTypes.ENUM([
				"NOT ACTIVE",
				"SEMIACTIVE",
				"ACTIVE",
				"BANNED",
				"DELETED",
			]),
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM(["ATHLETE", "PROFESSIONIST"]),
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		surname: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		dateBirth: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		sex: {
			type: DataTypes.ENUM([
				"MALE",
				"FEMALE",
				"BINARY",
				"PANGENDER",
				"BIGENDER",
				"GENDER FLUID",
				"NOT SPECIFIED",
			]),
			allowNull: true,
			defaultValue: "NOT SPECIFIED",
		},
		photo: {
			type: DataTypes.STRING(250),
			allowNull: true,
		},
		cover: {
			type: DataTypes.STRING(250),
			allowNull: true,
		},
		title: {
			type: DataTypes.STRING(150),
			allowNull: true,
			defaultValue: null,
		},
		biography: {
			type: DataTypes.STRING(5000),
			allowNull: true,
		},
		dateCreation: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
		lastUpdate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
	}, {
		sequelize,
		createdAt: "dateCreation",
		updatedAt: "lastUpdate",
		tableName: "users",
	});

	return User;
};