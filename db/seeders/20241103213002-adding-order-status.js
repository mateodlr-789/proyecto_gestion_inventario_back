'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('types', [
			{
        name: 'confirmed',
      },
			{
        name: 'preparing',
      },
			{
        name: 'done',
      },
			{
        name: 'delivered',
      },
			], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('types', null, {});
  }
};
