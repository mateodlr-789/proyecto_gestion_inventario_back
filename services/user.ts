import bcrypt from 'bcrypt';
import { generarJWT } from '../helpers/generar-jwt';
import { BadRequestError, DuplicateItem, NotFoundError } from '../helpers/http-errors';
import Type from '../models/types';
import User from '../models/user';

export const handleLogin = async (email: string, password: string): Promise<string> => {
    const user = await User.findOne({
        where: { email },
    });

    if (!user) {
        throw new BadRequestError('Incorrect username or password');
    }

    const validPassword = await bcrypt.compare(password, user.getDataValue('password'));
    if (!validPassword) {
        throw new BadRequestError('Incorrect username or password');
    }

    const token = await generarJWT(user.getDataValue('id'));
    return token;
};

export const handleRegister = async (body: any) => {
    const { email, password } = body;

    const hasEmail = await User.findOne({ where: { email } });
    if (hasEmail) {
        throw new DuplicateItem(`A user already exists with the email ${email}`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    body.password = hashedPassword;
    const user = await User.create(body);

    return user;
};


export const handleUpdateRole = async (id: string, role: string) => {
	  const validRoles = ['admin', 'waiter', 'chef'];

    if (!validRoles.includes(role)) {
        throw new BadRequestError('The role that was sent it is not correct');
    }

    if (!/^\d+$/.test(id)) {
        throw new BadRequestError('The id that was sent it is not correct');
    }

    const user = await User.findByPk(id);
    if (!user) {
        throw new NotFoundError(`There is no user with id ${id}`);
    }

    const roleId = await Type.findOne({
        where: { name: role },
        attributes: ['id'],
    }).then((type) => (type ? type.get('id') : null));

    if (!roleId) {
        throw new BadRequestError(`The role ${role} is not associated with a valid type`);
    }

    await user.update({ types_id: roleId });
};


export const handleDeleteUser = async (id: string) => {

	const user = await User.findByPk(id)

	if (!/^\d+$/.test(id)) {
		throw(new BadRequestError('The id that was sent it is not correct'));
	}

	else if (!user) {
		throw(new NotFoundError(`There is no user with id ${id}`));
	}

	await user.destroy();
}

