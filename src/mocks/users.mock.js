import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { createHash } from '../utils/index.js';

const DEFAULT_PASSWORD = 'coder123';

// Genera un usuario con el mismo formato que devolvería Mongo (con _id).
// El hash se recibe por parámetro para encriptar "coder123" una sola vez
// y no repetir bcrypt por cada usuario.
export const generateUser = (hashedPassword) => {

    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();

    return {
        _id: new mongoose.Types.ObjectId(),
        first_name,
        last_name,
        // El sufijo aleatorio evita emails repetidos (el campo es unique en Mongo)
        email: `${first_name}.${last_name}.${faker.string.alphanumeric(6)}@example.com`.toLowerCase(),
        password: hashedPassword,
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: []
    };
};

export const generateUsers = async (quantity) => {

    const hashedPassword = await createHash(DEFAULT_PASSWORD);

    return Array.from(
        { length: quantity },
        () => generateUser(hashedPassword)
    );
};
