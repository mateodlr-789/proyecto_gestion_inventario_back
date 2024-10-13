import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generarJWT } from '../helpers/generar-jwt';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener usuarios',
           
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                msg: `No existe un usuario con el id ${id}`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener el usuario',
            
        });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos',
            });
        }

        const validPassword = await bcrypt.compare(password, user.getDataValue("password"));
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos',
            });
        }

        const token = await generarJWT(user.getDataValue("id"));

        res.json({
            msg: 'Inicio de sesión exitoso',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
           
        });
    }
}

export const register = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const hasEmail = await User.findOne({
            where: {
                email: body.email,
            },
        });

        if (hasEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el correo ' + body.email,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        body.password = hashedPassword;

        const user = await User.create(body);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
           
        });
    }
}
