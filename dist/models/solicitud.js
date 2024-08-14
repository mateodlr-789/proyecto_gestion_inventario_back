"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const usuario_1 = __importDefault(require("./usuario"));
const Solicitud = connection_1.default.define('solicitud', {
    id: {
        type: sequelize_1.DataTypes === null || sequelize_1.DataTypes === void 0 ? void 0 : sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    codigo: {
        type: sequelize_1.DataTypes === null || sequelize_1.DataTypes === void 0 ? void 0 : sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    resumen: {
        type: sequelize_1.DataTypes === null || sequelize_1.DataTypes === void 0 ? void 0 : sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_empleado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'solicitud'
});
Solicitud.belongsTo(usuario_1.default, { foreignKey: 'id_empleado' });
exports.default = Solicitud;
//# sourceMappingURL=solicitud.js.map