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
                    throw new Error('The name should be a string');
                }
            },
        },
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            isFloat: { msg: 'The price should be a valid float' },
            min: 0,
        },
        },
        types_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'types', 
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          validate: {
            async exists(value: number) {
              const typeExists = await Type.findByPk(value);
              if (!typeExists) {
                throw new Error(`The type_id ${value} doesn't exist in the data base`);
              }
            },
          }
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          validate: {
            isInt: { msg: 'The stock should be an integer' },
            min: 0, 
        },
        },
        image_url: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            notEmpty: true,
            isString(value: any){
              if (typeof(value) !== 'string'){
                throw new Error('the url should be a string');
              }
            },
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