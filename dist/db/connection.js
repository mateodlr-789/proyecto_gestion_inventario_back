"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbDialect = process.env.DB_DIALECT || 'mysql';
const dbHots = (process.env.DB_HOST) || 'localhost';
const dbNameTable = (process.env.DB_NAME_TABLE) || 'gestion_inventario';
const db = new sequelize_1.Sequelize(dbNameTable, 'root', '', {
    host: dbHots,
    dialect: dbDialect,
});
exports.default = db;
//# sourceMappingURL=connection.js.map