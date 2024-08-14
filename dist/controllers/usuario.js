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
exports.createUsuario = exports.loginUsuario = exports.getUser = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generar_jwt_1 = require("../helpers/generar-jwt");
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield user_1.default.findAll();
    res.json({ usuario });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield user_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUser = getUser;
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield user_1.default.findOne({
            where: {
                email
            }
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            });
        }
        const validPassword = yield bcrypt_1.default.compare(password, usuario.getDataValue('password'));
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            });
        }
        const token = yield generar_jwt_1.generarJWT(usuario.getDataValue('id'));
        res.json({
            msg: 'Inicio de sesión exitoso',
            token
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
            error: error
        });
    }
});
exports.loginUsuario = loginUsuario;
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el correo ' + body.email
            });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(body.password, salt);
        body.password = hashedPassword;
        const usuario = yield user_1.default.create(body);
        res.json(usuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.createUsuario = createUsuario;
//# sourceMappingURL=usuario.js.map