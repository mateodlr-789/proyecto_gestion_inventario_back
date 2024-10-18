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
          validate: {
            notEmpty: true, 
            isString(value: any) {
                if (typeof value !== 'string') {
                    throw new Error('El nombre debe ser una cadena de texto.');
                }
            },
        },
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            isFloat: { msg: 'El precio debe ser un número flotante válido.' },
            min: 0,
        },
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
          validate: {
            isInt: { msg: 'El stock debe ser un número entero.' },
            min: 0, 
        },
        },
      },
      {
        tableName: 'products',
        timestamps: true,
        paranoid: true, 
      }

)

Product.belongsTo(Type, {
  foreignKey: 'types_id',
  as: 'type',
  onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});


export default Product