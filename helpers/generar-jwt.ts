import jwt from 'jsonwebtoken';

export const generarJWT = async (uid = '') => {
    try {
        const payload = { uid };
        const token = jwt.sign(payload, 'mi_clave_secreta_para_produccion', {
            expiresIn: '4h'
        });
        return token;
    } catch (error) {
        console.error('Error al generar el token:', error);
        throw new Error('No se pudo generar el token');
    }
};
