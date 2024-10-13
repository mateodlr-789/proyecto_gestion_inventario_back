const { DataTypes } = require('sequelize');

import db from '../db/connection';

const Type = db.define('Type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  value: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'types',
  timestamps: false, 
});

export default Type;