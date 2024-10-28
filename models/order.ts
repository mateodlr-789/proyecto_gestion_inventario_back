import { Model, DataTypes, Optional } from 'sequelize';
import db from '../db/connection'; 
import  Type  from './types';
import User from './user';

const Order = db.define('orders',
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

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'users', 
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            validate: {
              async exists(value: number) {
                const typeExists = await User.findByPk(value);
                if (!typeExists) {
                  throw new Error(`The type_id ${value} doesn't exist in the data base`);
                }
              },
            }
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
    },
    {
        tableName: 'orders',
        timestamps: true,
        paranoid: true,
    }
)

Order.belongsTo(Type,{
    foreignKey: 'types_id',
    as: 'type',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});

export default Order