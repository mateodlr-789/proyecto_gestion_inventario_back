'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('types', [
			{
				name: 'admin',
			},
			{
				name: 'waiter',
			},
			{
				name: 'chef',
			},
			]);
	},

  async down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('types', null, {});
  },
};
