module.exports = {
  development: {
    username: "root",
    password: null,
    database: process.env.DB_NAME_TABLE || "gestion_inventario",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};


