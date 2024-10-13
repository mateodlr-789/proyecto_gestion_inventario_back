import { DataTypes } from 'sequelize';

import db from '../db/connection';

const Type = require('./types'); // Importar el modelo Type

const User = db.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'types', // Nombre de la tabla
        key: 'id',
      },
      onUpdate: 'CASCADE', // Aquí sí es válido
      onDelete: 'SET NULL',
    },
    date_entry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // No necesitamos onUpdate aquí
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'users',
    timestamps: false, // Habilita createdAt y updatedAt automáticamente
    paranoid: false, // Habilita eliminaciones lógicas con deletedAt
  });
  
  User.belongsTo(Type, {
    foreignKey: 'type_id',
    as: 'type',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });
  
 export default User;
