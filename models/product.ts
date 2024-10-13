import { Model, DataTypes, Optional } from 'sequelize';
import db from '../db/connection'; 
import  Type  from './types';

const Product = db.define('products', 
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        types_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'types', // Nombre de la tabla referenciada
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        tableName: 'products',
        timestamps: false,
        paranoid: false, 
      }

)

Product.belongsTo(Type, {
  foreignKey: 'types_id',
  as: 'type',
  onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});


export default Product