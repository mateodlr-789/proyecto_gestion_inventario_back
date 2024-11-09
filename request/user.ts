import { object, number, string } from 'yup';

export const createUserSchema = object({
    types_id:
        number()
            .typeError('The type should be an integer')
            .integer('The type should be an integer')
            .required('The type is mandatory'),

    name: string()
        .strict()
        .max(25, 'The name cannot be longer than 25 characters')
        .required('Name is required'),

    last_name:
        string()
            .strict()
            .max(25, 'The last name cannot be longer than 25 characters')
            .required('Last name is required'),

    email:
        string()
            .max(50, 'The email cannot be longer than 50 characters')
            .email('Must be a valid email')
            .required('Email is required'),

    password:
        string()
            .max(150, 'The password cannot be longer than 150 characters')
            .required('Password is required'),
});

export const logingUserSchema = object({
    email:
        string()
            .max(50, 'The email cannot be longer than 50 characters')
            .email('Must be a valid email')
            .required('Email is required'),

    password:
        string()
            .max(150, 'The password cannot be longer than 150 characters')
            .required('Password is required'),
});