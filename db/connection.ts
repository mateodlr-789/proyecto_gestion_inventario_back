import { Sequelize, Dialect } from 'sequelize';

const dbDialect: Dialect = (process.env.DB_DIALECT as Dialect) || 'mysql';
const dbHots: string = (process.env.DB_HOST) || 'localhost';
const dbNameTable: string = (process.env.DB_NAME_TABLE) || 'gestion_inventario';

const db = new Sequelize(dbNameTable, 'root', '', {
    host: dbHots,
    dialect: dbDialect,
    // logging: false,
});

export default db;
