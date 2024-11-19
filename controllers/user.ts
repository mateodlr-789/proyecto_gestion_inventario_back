import { NextFunction, Request, Response } from 'express';

import User from '../models/user';
import { NotFoundError } from '../helpers/http-errors';
import { handleDeleteUser, handleLogin, handleRegister, handleUpdateRole } from '../services/user';


export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findAll();

        if (!user) {
            return res.status(200).json('There are no users registered');
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

    try {

				const { email, password } = req.body;

				const token = await handleLogin(email, password);
				
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

    try {

				const user = await handleRegister(req.body);

        res.status(201).json({
						msg: 'User succesfully registered',
						user,
				});

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

				await handleDeleteUser(id);

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

    try {

				const { id } = req.params;
				const { role } = req.body;

				await handleUpdateRole(id, role);

        res.json({
            msg: 'Role was updated',
        });
    } catch (error) {
        next(error);
    }

}
