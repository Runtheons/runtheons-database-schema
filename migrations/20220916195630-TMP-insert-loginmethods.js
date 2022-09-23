"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.sequelize
				.query(`INSERT INTO loginmethods(idUser, type, email, password, dateCreation, lastUpdate)
			SELECT 
				U.id AS idUser, 
				"CLASSIC" AS type,
				U.email AS email,
				U.password AS password,
				U.dateCreation AS dateCreation,
				U.lastUpdate AS dateCreation
			FROM users AS U`);


			await queryInterface.sequelize
				.query(`INSERT INTO events(idUser, datetime, type, value, new)

				SELECT 
					idUser AS idUser,
					dateCreation AS datetime,
					"LOGINMETHOD_CREATE" AS type,
					idLoginMethod AS value,
					CONCAT('{"idLoginMethod":',idLoginMethod,', "idUser":',idUser,',"type":"CLASSIC", "email":"',email,'", "password":"',password,'", "dateCreation":"',dateCreation,'", "lastUpdate":"',lastUpdate,'"}') AS new
				FROM loginmethods`);
		} catch (e) {
			console.log(e);
		}
	},

	down: async(queryInterface, Sequelize) => {},
};