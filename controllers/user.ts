import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import {generarJWT} from '../helpers/generar-jwt'
import User from '../models/user';
import { BadRequestError, NotFoundError } from '../helpers/http-errors';
import * as yup	from 'yup';

export const getUsers = async( 
    req: Request, 
    res: Response,
    next: NextFunction 
) => {
    try{
        const user = await User.findAll();
        
        if (!user){
            return next(new NotFoundError('There are no users registered'));
        }

        res.json({ user });   
    } catch(error){
        next(error)
    }
}

export const getUser = async( 
    req: Request,
    res: Response,
    next: NextFunction 
) => {
    try{
        const { id } = req.params;

        const user = await User.findByPk( id );

        if (!user){
            return next(new NotFoundError(`There is no user with id ${id}`));
        }
        
        res.json(user);
        
    } catch(error){
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

        const token = await generarJWT( user.getDataValue('id') );

        res.json({
            msg: 'Inicio de sesión exitoso',
            token
        });
    } catch (error) {
        next(error);
    }
}

export const register = async( 
    req: Request, 
    res: Response,
    next:NextFunction
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
        res.json( user );


    } catch (error) {

        next(error)
            
    }
}

export const deleteUser = async(
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
    
        else if (!user){
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

export const createUserSchema = yup.object({
    types_id: yup
      .number()
      .typeError('The type should be an integer')
      .integer('The type should be an integer')
      .required('The type is mandatory'),

    name: yup
      .string()
      .strict()
      .max(25, 'The name cannot be longer than 25 characters')
      .required('Name is required'),

    last_name: yup
      .string()
      .strict()
      .max(25, 'The last name cannot be longer than 25 characters')
      .required('Last name is required'),

    email: yup
      .string()
      .max(50, 'The email cannot be longer than 50 characters')
      .email('Must be a valid email')
      .required('Email is required'),

    password: yup
      .string()
      .max(150, 'The password cannot be longer than 150 characters')
      .required('Password is required'),
});

export const logingUserSchema = yup.object({
    email: yup
      .string()
      .max(50, 'The email cannot be longer than 50 characters')
      .email('Must be a valid email')
      .required('Email is required'),

    password: yup
      .string()
      .max(150, 'The password cannot be longer than 150 characters')
      .required('Password is required'),
});

export const idSchema = yup.object({
    id: yup.number().integer('The ID must be an integer').required('ID is required'),
});