"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Usuario = connection_1.default.define('users', {
    id: {
        type: sequelize_1.DataTypes === null || sequelize_1.DataTypes === void 0 ? void 0 : sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    role: {
        type: sequelize_1.DataTypes === null || sequelize_1.DataTypes === void 0 ? void 0 : sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 2
    },
    date_entry: {
        type: sequelize_1.DataTypes === null || sequelize_1.DataTypes === void 0 ? void 0 : sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map