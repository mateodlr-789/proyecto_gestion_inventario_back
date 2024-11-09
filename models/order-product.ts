import { Model, DataTypes, Optional } from 'sequelize';
import db from '../db/connection'; 
import Order from './order';
import Product from './product';

const OrderProduct = db.define('orders',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },

        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'orders', 
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            validate: {
              async exists(value: number) {
                const typeExists = await OrderProduct.findByPk(value);
                if (!typeExists) {
                  throw new Error(`The type_id ${value} doesn't exist in the data base`);
                }
              },
            }
          },
          product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'products', 
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            validate: {
              async exists(value: number) {
                const typeExists = await Product.findByPk(value);
                if (!typeExists) {
                  throw new Error(`The type_id ${value} doesn't exist in the data base`);
                }
              },
            }
          },
          total: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
              isInt: { msg: 'The total should be an integer' },
              min: 0, 
          },
          },
    },
    {
        tableName: 'order_products',
        timestamps: true,
        paranoid: true,
    }
)

export default OrderProduct