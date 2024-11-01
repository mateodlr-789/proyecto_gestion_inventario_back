'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
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
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0
        }
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
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0
        }
      },
      image_url: {
        type: Sequelize.STRING(255),
        allowNull: false
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
    await queryInterface.addIndex('products', ['types_id'], {
      name: 'products_types_id_index'
    });

    await queryInterface.addIndex('products', ['name'], {
      name: 'products_name_index'
    });

    // Índice para búsquedas por precio
    await queryInterface.addIndex('products', ['price'], {
      name: 'products_price_index'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
