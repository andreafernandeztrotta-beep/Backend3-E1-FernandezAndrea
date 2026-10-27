import { generatePets } from '../mocks/pets.mock.js';
import { generateUsers } from '../mocks/users.mock.js';
import { usersService, petsService } from '../services/index.js';
import asyncHandler from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';

const MOCKING_PETS_QUANTITY = 100;
const MOCKING_USERS_QUANTITY = 50;

const getMockingPets = asyncHandler(async (req, res) => {

    const pets = generatePets(MOCKING_PETS_QUANTITY);

    res.send({ status: 'success', payload: pets });
});

const getMockingUsers = asyncHandler(async (req, res) => {

    const users = await generateUsers(MOCKING_USERS_QUANTITY);

    res.send({ status: 'success', payload: users });
});

// Acepta enteros >= 0, ya sea número o texto numérico ("10")
const parseQuantity = (value, field) => {

    const quantity = Number(value);

    if (value === undefined || value === null || value === '' || !Number.isInteger(quantity) || quantity < 0) {
        throw new CustomError(`El parámetro "${field}" debe ser un número entero mayor o igual a 0`, 400);
    }

    return quantity;
};

const generateData = asyncHandler(async (req, res) => {

    const users = parseQuantity(req.body.users, 'users');
    const pets = parseQuantity(req.body.pets, 'pets');

    const generatedUsers = users > 0 ? await usersService.createMany(await generateUsers(users)) : [];
    const generatedPets = pets > 0 ? await petsService.createMany(generatePets(pets)) : [];

    res.send({
        status: 'success',
        payload: {
            users: generatedUsers.length,
            pets: generatedPets.length
        }
    });
});

export default {
    getMockingPets,
    getMockingUsers,
    generateData
};
