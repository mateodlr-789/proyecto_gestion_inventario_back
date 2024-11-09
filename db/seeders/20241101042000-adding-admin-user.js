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
				password: '$2b$10$Om0ao796LzzvP/01Lp.9pe29cQuXbKXQWlnu7eBgVWuSqn30cjHpq',
			}
			], {});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {});
	}
};
