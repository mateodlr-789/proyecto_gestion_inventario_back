import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { generarJWT } from '../helpers/generar-jwt'
import User from '../models/user';
import { BadRequestError, NotFoundError } from '../helpers/http-errors';
import Type from '../models/types';


export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findAll();

        if (!user) {
            return next(new NotFoundError('There are no users registered'));
        }

        res.json({ user });
    } catch (error) {
        next(error)
    }
}

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return next(new NotFoundError(`There is no user with id ${id}`));
        }

        res.json(user);

    } catch (error) {
        next(error)
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return next(new BadRequestError('Incorrect username or password'));
        }
        const validPassword = await bcrypt.compare(password, user.getDataValue('password'));
        if (!validPassword) {
            return next(new BadRequestError('Incorrect username or password'));
        }

        const token = await generarJWT(user.getDataValue('id'));

        res.json({
            msg: 'Inicio de sesión exitoso',
            token
        });
    } catch (error) {
        next(error);
    }
}

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { body } = req;

    try {

        const hasEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (hasEmail) {
            return next(new BadRequestError(`A user already exists with the email ${body.email}`))
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        body.password = hashedPassword;

        const user = await User.create(body);
        res.json(user);


    } catch (error) {

        next(error)

    }
}

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const { id } = req.params;

        const user = await User.findByPk(id)

        if (!/^\d+$/.test(id)) {
            return next(new BadRequestError('The id that was sent it is not correct'));
        }

        else if (!user) {
            return next(new NotFoundError(`There is no user with id ${id}`));
        }

        await user.destroy();

        res.json({
            msg: 'User was logically eliminated',
        });
    } catch (error) {
        next(error);
    }

}

export const updateRole = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { role } = req.body;
    const validRoles = ['admin', 'waiter', 'chef'];

    if (!validRoles.includes(role)) {
        return next(new BadRequestError('The role that was sent it is not correct'));
    }

    try {

        if (!/^\d+$/.test(id)) {
            return next(new BadRequestError('The id that was sent it is not correct'));
        }

        const user = await User.findByPk(id)

        if (!user) {
            return next(new NotFoundError(`There is no user with id ${id}`));
        }
        const roleId = await Type.findOne({
            where: { name: role },
            attributes: ['id'],
        }).then(user => user ? user.get('id') : null);

        await user.update({ types_id: roleId });

        res.json({
            msg: 'Role was updated',
        });
    } catch (error) {
        next(error);
    }

}