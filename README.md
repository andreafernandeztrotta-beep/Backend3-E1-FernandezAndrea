# Backend III - Entrega N°1: Mocks

Andrea Fernández

## Endpoints (base: /api/mocks)

- GET /api/mocks/mockingpets: genera 100 mascotas
- GET /api/mocks/mockingusers: genera 50 usuarios (password "coder123" encriptada, role user/admin, pets vacío)
- POST /api/mocks/generateData: recibe { "users": 10, "pets": 5 } e inserta esa cantidad en la base

## Capturas

### POST /generateData
![generateData](capturas/1-generateData.png)

### GET /api/users
![users](capturas/2-users.png)

### GET /api/pets
![pets](capturas/3-pets.png)

### GET /api/mocks/mockingusers
![mockingusers](capturas/4-mockingusers.png)

### GET /api/mocks/mockingpets
![mockingpets](capturas/5-mockingpets.png)
