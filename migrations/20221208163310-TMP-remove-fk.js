'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		if (queryInterface.sequelize.dialect.name == "mysql") {
			await queryInterface.sequelize.query(`ALTER TABLE chats DROP FOREIGN KEY chats_ibfk_1`);
			await queryInterface.sequelize.query(`ALTER TABLE chats DROP FOREIGN KEY chats_ibfk_2`);


			await queryInterface.sequelize.query(`ALTER TABLE estimates DROP FOREIGN KEY estimates_ibfk_2`);
			await queryInterface.sequelize.query(`ALTER TABLE estimates DROP FOREIGN KEY estimates_ibfk_3`);


			await queryInterface.sequelize.query(`ALTER TABLE follows DROP FOREIGN KEY follows_ibfk_1`);
			await queryInterface.sequelize.query(`ALTER TABLE follows DROP FOREIGN KEY follows_ibfk_2`);


			await queryInterface.sequelize.query(`ALTER TABLE invoices DROP FOREIGN KEY invoices_ibfk_2`);


			await queryInterface.sequelize.query(`ALTER TABLE notifications DROP FOREIGN KEY notifications_ibfk_1`);


			await queryInterface.sequelize.query(`ALTER TABLE payments DROP FOREIGN KEY payments_ibfk_2`);


			await queryInterface.sequelize.query(`ALTER TABLE products DROP FOREIGN KEY products_ibfk_1`);
			await queryInterface.sequelize.query(`ALTER TABLE products DROP FOREIGN KEY products_ibfk_2`);


			await queryInterface.sequelize.query(`ALTER TABLE researches DROP FOREIGN KEY researches_ibfk_1`);
			await queryInterface.sequelize.query(`ALTER TABLE researches DROP FOREIGN KEY researches_ibfk_2`);


			await queryInterface.sequelize.query(`ALTER TABLE reviews DROP FOREIGN KEY reviews_ibfk_1`);


		}
	},
	down: async(queryInterface, Sequelize) => {
		if (queryInterface.sequelize.dialect.name == "mysql") {
			await queryInterface.addConstraint('chats', {
				fields: ['idUserA'],
				type: 'foreign key',
				name: 'chats_ibfk_1',
				references: {
					table: 'OLD_users',
					field: 'id'
				}
			});
			await queryInterface.addConstraint('chats', {
				fields: ['idUserB'],
				type: 'foreign key',
				name: 'chats_ibfk_2',
				references: {
					table: 'OLD_users',
					field: 'id'
				}
			});


			await queryInterface.addConstraint('estimates', {
				fields: ['idUserAthlete'],
				type: 'foreign key',
				name: 'estimates_ibfk_2',
				references: {
					table: 'OLD_users',
					field: 'id'
				}
			});
			await queryInterface.addConstraint('estimates', {
				fields: ['idUserProfessionist'],
				type: 'foreign key',
				name: 'estimates_ibfk_3',
				references: {
					table: 'OLD_users',
					field: 'id'
				}
			});


			await queryInterface.addConstraint('follows', {
				fields: ['idUser'],
				type: 'foreign key',
				name: 'follows_ibfk_1',
				references: {
					table: 'OLD_users',
					field: 'id'
				}
			});
			await queryInterface.addConstraint('follows', {
				fields: ['idUserFollowing'],
				type: 'foreign key',
				name: 'follows_ibfk_2',
				references: {
					table: 'OLD_users',
					field: 'id'
				}
			});


			await queryInterface.addConstraint('invoices', {
				fields: ['idUser'],
				type: 'foreign key',
				name: 'invoices_ibfk_2',
				references: {
					table: 'OLD_users',
					field: 'id'
				}
			});


			await queryInterface.addConstraint('notifications', {
				fields: ['idUser'],
				type: 'foreign key',
				name: 'notifications_ibfk_1',
				references: {
					table: 'OLD_users',
					field: 'id'
				}
			});


			await queryInterface.addConstraint('payments', {
				fields: ['idUser'],
				type: 'foreign key',
				name: 'payments_ibfk_2',
				references: {
					table: 'OLD_users',
					field: 'id'
				}
			});


			await queryInterface.addConstraint('products', {
				fields: ['idUserProfessionist'],
				type: 'foreign key',
				name: 'products_ibfk_1',
				references: {
					table: 'OLD_users',
					field: 'id'
				}
			});
			await queryInterface.addConstraint('products', {
				fields: ['idSpeciality'],
				type: 'foreign key',
				name: 'products_ibfk_2',
				references: {
					table: 'OLD_specialities',
					field: 'id'
				}
			});


			await queryInterface.addConstraint('researches', {
				fields: ['idUser'],
				type: 'foreign key',
				name: 'researches_ibfk_2',
				references: {
					table: 'OLD_users',
					field: 'id'
				}
			});
			await queryInterface.addConstraint('researches', {
				fields: ['idSpeciality'],
				type: 'foreign key',
				name: 'researches_ibfk_1',
				references: {
					table: 'OLD_specialities',
					field: 'id'
				}
			});


			await queryInterface.addConstraint('reviews', {
				fields: ['idUser'],
				type: 'foreign key',
				name: 'reviews_ibfk_1',
				references: {
					table: 'OLD_users',
					field: 'id'
				}
			});

		}
	}
};