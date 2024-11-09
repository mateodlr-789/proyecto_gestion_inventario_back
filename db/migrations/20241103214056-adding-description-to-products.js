'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
		await queryInterface.addColumn('products', 'description', {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "Descripción pendiente"
		});
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.removeColumn('products', 'description');
  }
};
