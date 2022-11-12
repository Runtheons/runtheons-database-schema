"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.changeColumn("events", "type", {
			type: Sequelize.ENUM([
				"TARGET_CREATE",
				"TARGET_UPDATE_AGERANGE",
				"TARGET_UPDATE_SPORTS",
				"TARGET_UPDATE_SEXS",
				"TARGET_UPDATE_POSITIONS",
				"TARGET_DELETE",
				"LOGINMETHOD_CREATE",
				"LOGINMETHOD_UPDATE",
				"LOGINMETHOD_DELETE",
				"USER_CREATE",
				"USER_UPDATE_SPORTS",
				"USER_UPDATE_SPECIALITIES",
				"USER_UPDATE_GOALS",
				"USER_UPDATE_STATUS",
				"USER_UPDATE_NAME",
				"USER_UPDATE_SURNAME",
				"USER_UPDATE_DATEBIRTH",
				"USER_UPDATE_SEX",
				"USER_UPDATE_POSITION",
				"USER_UPDATE_PHOTO",
				"USER_UPDATE_COVER",
				"USER_UPDATE_TITLE",
				"USER_UPDATE_BIOGRAPHY",
				"USER_DELETE",
			]),
		});
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.changeColumn("events", "type", {
			type: Sequelize.ENUM([
				"LOGINMETHOD_CREATE",
				"LOGINMETHOD_UPDATE",
				"LOGINMETHOD_DELETE",
				"USER_CREATE",
				"USER_UPDATE_SPORTS",
				"USER_UPDATE_SPECIALITIES",
				"USER_UPDATE_GOALS",
				"USER_UPDATE_STATUS",
				"USER_UPDATE_NAME",
				"USER_UPDATE_SURNAME",
				"USER_UPDATE_DATEBIRTH",
				"USER_UPDATE_SEX",
				"USER_UPDATE_POSITION",
				"USER_UPDATE_PHOTO",
				"USER_UPDATE_COVER",
				"USER_UPDATE_TITLE",
				"USER_UPDATE_BIOGRAPHY",
				"USER_DELETE",
			]),
		});
	},
};