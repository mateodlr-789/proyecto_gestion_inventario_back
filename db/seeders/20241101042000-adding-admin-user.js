'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		const [type] = await queryInterface.sequelize.query(
			`SELECT id FROM types WHERE name = 'admin' LIMIT 1;`
		);
		const typeId = type[0]?.id;
		await queryInterface.bulkInsert('users', [
			{
				types_id: typeId,
				name: 'admin',
				last_name: 'admin',
				email: 'admin@admin.com',
				password: '$2b$10$xeRLAOpmOVoOkNwXyZ9bOebas5ufkDaeO1492lpdWIS1zumZ54ZjC',
			}
			], {});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {});
	}
};
