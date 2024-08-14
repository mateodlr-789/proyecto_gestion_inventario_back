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
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }
    try {
        const jwtSecret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '';
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = yield user_1.default.findByPk(decoded.uid);
        if (!user) {
            return res.status(401).json({ msg: 'Token no válido - usuario no existe en la base de datos' });
        }
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ msg: 'Token expirado' });
        }
        console.error('Error al validar el token:', error);
        res.status(401).json({ msg: 'Token no válido' });
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map