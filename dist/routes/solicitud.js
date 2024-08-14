"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const solicitud_1 = require("../controllers/solicitud");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_campos_1 = require("../helpers/validar-campos");
const router = express_1.Router();
router.get('/:id', [validar_jwt_1.validarJWT], solicitud_1.getSolicitud);
router.get('/', [validar_jwt_1.validarJWT], solicitud_1.getSolicitudes);
router.post('/', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    express_validator_1.check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    express_validator_1.check('resumen', 'El resumen es obligatorio').not().isEmpty(),
    express_validator_1.check('id_empleado', 'El id del empleado es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], solicitud_1.createSolicitud);
router.delete('/:id', [validar_jwt_1.validarJWT], solicitud_1.deleteSolicitud);
exports.default = router;
//# sourceMappingURL=solicitud.js.map