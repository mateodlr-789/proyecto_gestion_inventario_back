'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
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
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      types_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'types',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      // Campos de timestamps
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      // Campo para soft delete
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Añadir índices para mejorar el rendimiento
    await queryInterface.addIndex('orders', ['user_id'], {
      name: 'orders_user_id_index'
    });

    await queryInterface.addIndex('orders', ['types_id'], {
      name: 'orders_types_id_index'
    });

    await queryInterface.addIndex('orders', ['name'], {
      name: 'orders_name_index'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};
