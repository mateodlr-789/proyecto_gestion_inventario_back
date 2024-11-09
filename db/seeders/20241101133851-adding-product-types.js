'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('types', [
			{
				name: 'entrace',
      },
			{
				name: 'main',
      },
			{
				name: 'dessert',
      },
			{
				name: 'drink',
      }
			], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('types', {
				name: {
					[Sequelize.Op.in]: ['entrada', 'principal', 'postre', 'bebida']}
			}, {});
  }
};
