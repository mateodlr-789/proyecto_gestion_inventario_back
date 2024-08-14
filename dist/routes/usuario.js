"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = express_1.Router();
router.get('/', user_1.getUsers);
router.get('/:id', [validar_jwt_1.validarJWT], user_1.getUser);
router.post('/', user_1.register);
router.post('/login', user_1.login);
exports.default = router;
//# sourceMappingURL=usuario.js.map