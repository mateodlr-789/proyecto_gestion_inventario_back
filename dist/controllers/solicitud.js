"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSolicitud = exports.getSolicitudes = exports.createSolicitud = exports.getSolicitud = void 0;
const sequelize_1 = require("sequelize");
const solicitud_1 = __importDefault(require("../models/solicitud"));
const usuario_1 = __importDefault(require("../models/usuario"));
const getSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        const solicitud = yield solicitud_1.default.findAll({
            where: {
                id_empleado: id,
                deletedAt: null
            },
        });
        res.json(solicitud);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`,
        });
    }
});
exports.getSolicitud = getSolicitud;
const createSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(body.id_empleado);
        if (usuario) {
            const solicitud = yield solicitud_1.default.create(body);
            res.json(solicitud);
        }
        else {
            res.status(404).json({
                msg: `No existe un usuario con el id ${body.id_empleado}`,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
});
exports.createSolicitud = createSolicitud;
const getSolicitudes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solicitudes = yield solicitud_1.default.findAll({
            where: {
                deletedAt: null
            },
            include: [
                {
                    model: usuario_1.default,
                    where: { id: sequelize_1.Sequelize.col("solicitud.id_empleado") },
                },
            ],
            raw: true,
        });
        const response = solicitudes.map((item) => {
            var _a;
            return ({
                codigo: item === null || item === void 0 ? void 0 : item.codigo,
                descripcion: item === null || item === void 0 ? void 0 : item.descripcion,
                resumen: item === null || item === void 0 ? void 0 : item.resumen,
                usuario: (_a = item['usuario.nombre']) !== null && _a !== void 0 ? _a : ''
            });
        });
        res.json(response);
    }
    catch (error) {
        console.error("Error al obtener las solicitudes:", error);
        res.status(500).json({
            msg: "Ocurrió un error al obtener las solicitudes",
        });
    }
});
exports.getSolicitudes = getSolicitudes;
const deleteSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const solicitud = yield solicitud_1.default.findByPk(id);
        if (solicitud) {
            if (solicitud.get().deletedAt) {
                return res.status(401).json({
                    msg: `La solicitud con el id ${id} ya ha sido eliminada.`,
                });
            }
            solicitud.update({ deletedAt: new Date().toISOString() });
            res.json(solicitud);
        }
        else {
            res.status(404).json({
                msg: `No existe una solicitud con el id ${id}`,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
});
exports.deleteSolicitud = deleteSolicitud;
//# sourceMappingURL=solicitud.js.map