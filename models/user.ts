import { DataTypes } from 'sequelize';

import db from '../db/connection';

import Type from './types'; 

const User = db.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    types_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'types', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
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
  }, {
    tableName: 'users',
    timestamps: true,
    paranoid: true, 
  });
  
  User.belongsTo(Type, {
    foreignKey: 'type_id',
    as: 'type',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });
  
 export default User;