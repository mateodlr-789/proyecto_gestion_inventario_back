'use strict';

module.exports = {
  up: async (queryInterface , Sequelize ) => {
    await queryInterface.createTable('types', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      value: {
        type: Sequelize.STRING(255),
      }
      
    });
  },

  down: async (queryInterface, Sequelize ) => {
    await queryInterface.dropTable('types');
  }
};
