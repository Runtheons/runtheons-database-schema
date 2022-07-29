const { DataTypes, Model } = require("sequelize");
const Sequelize = require("sequelize");

class User extends Model {}

module.exports = (sequelize) => {
	User.init({
		idUser: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING(150),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(150),
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
		sex: {
			type: DataTypes.ENUM([
				"MALE",
				"FEMALE",
				"NOT-BINARY",
				"BIGENDER",
				"PANGENDER",
				"GENDER FLUID",
			]),
			defaultValue: "MALE",
			allowNull: false,
		},
		bio: {
			type: DataTypes.STRING(3000),
			allowNull: true,
		},
		dateBirth: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		photo: {
			type: DataTypes.STRING(150),
			allowNull: true,
		},
		cover: {
			type: DataTypes.STRING(150),
			allowNull: true,
		},
		type: {
			type: DataTypes.ENUM([
				"ATHLETE",
				"PROFESSIONIST LITE",
				"PROFESSIONIST BUSINESS",
			]),
			allowNull: false,
			defaultValue: "ATHLETE",
		},
		verification: {
			type: DataTypes.ENUM(["NORMAL", "EXPERT"]),
			allowNull: false,
			defaultValue: "NORMAL",
		},
		status: {
			type: DataTypes.ENUM([
				"NOT ACTIVE",
				"IN QUEUE",
				"SEMIACTIVE",
				"ACTIVE",
				"BANNED",
				"DELETED",
			]),
			allowNull: false,
			defaultValue: "NOT ACTIVE",
		},
		idCustomer: {
			type: DataTypes.STRING(150),
			allowNull: true,
		},
		dateCreation: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
		lastUpdate: {
			type: DataTypes.DATE,
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