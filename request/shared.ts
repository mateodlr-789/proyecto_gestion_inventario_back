import {object, number} from 'yup';

const idSchema = object({
    id: number().integer('The ID must be an integer').required('ID is required'),
});

export {idSchema}