'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('types', [
			{
        name: 'dine-in',
      },
			{
        name: 'takeout',
      }
			], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('types', null, {});
  }
};
