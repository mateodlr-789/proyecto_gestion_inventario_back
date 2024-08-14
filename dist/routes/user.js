"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = express_1.Router();
router.get('/', user_1.getUsers);
router.get('/:id', [validate_jwt_1.validateJWT], user_1.getUser);
router.post('/register', user_1.register);
router.post('/login', user_1.login);
exports.default = router;
//# sourceMappingURL=user.js.map