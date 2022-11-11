'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			let [positions, metadata] = await queryInterface.sequelize.query(`SELECT id, position FROM OLD_users WHERE position IS NOT NULL`);
			for (let i = 0; i < positions.length; i++) {
				let position = positions[i];

				if (
					position.position.coordinates[0] < position.position.coordinates[1]
				) {
					position.position.coordinates = [position.position.coordinates[1], position.position.coordinates[0]];
				}

				if (position.position.coordinates[0] == position.position.coordinates[1]) {
					continue;
				}

				let [idPosition, metadata] = await queryInterface.sequelize.query(`INSERT INTO positions(latitude, longitude) VALUES (${position.position.coordinates[0]},${position.position.coordinates[1]})`);

				let result = await queryInterface.sequelize.query(`UPDATE users SET idPosition = ${idPosition} WHERE idUser=${position.id}`);
			}
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`UPDATE users SET idPosition = NULL WHERE idPosition IS NOT NULL`);
		await queryInterface.sequelize.query(`DELETE FROM positions`);
	}
};