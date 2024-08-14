import { DataTypes } from 'sequelize';

import db from '../db/connection';

const User = db.define('users', {
    id: {
        type: DataTypes?.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    role: {
        type: DataTypes?.INTEGER,
        allowNull: true,
        defaultValue: 2
    },
    date_entry: {
        type: DataTypes?.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


export default User;