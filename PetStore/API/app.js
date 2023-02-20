import express from 'express';
import cors from 'cors';
import { getPets, getPetByID, insertPet, modifyPet, deletePet } from './pets.service.js';
import { getUsers, getUserByID, modifyUser, deleteUser, insertUser } from './user.js';
import bodyParser from 'body-parser';

const app = express();
const port = 7777;

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* -----Start Pet API----- */
app.get('/pets', async (req, res) => {
  res.status(200).json(await getPets());
});

app.get('/pets/:id', async (req, res) => {
  const id = req.params.id;

  const pet = await getPetByID(id);

  if (pet) {
    res.status(200).json(pet);
    return;
  }

  res.status(404).send('Pet not found');
});

app.post('/pets', async (req, res) => {
  const pet = req.body;

  const petsDatabase = await getPetByID(pet.id);

  if (petsDatabase) {
    res.status(400).send("The pet already exists");
    return;
  }

  const newPet = await insertPet(pet);
  if (newPet) {
    res.json(pet);
    return;
  }
  res.status(400).send('Failure while creating the pet');
});

app.put('/pets/:id', async (req, res) => {
  const id = req.params.id;
  const newPet = req.body;

  if (newPet.id !== id) {
    res.status(400).send('El id de mascota en el body y la URL no es la misma');
    return;
  }

  const pet = await getPetByID(id);

  if (pet === null || pet === undefined) {
    res.status(400).json("The pet does not exists");
    return;
  }

  if (await modifyPet(newPet)) {
    res.json(newPet);
    return;
  }

  res.status(404).send('Pet not found');
});

app.delete('/pets/:id', async (req, res) => {
  const id = req.params.id;

  if (await deletePet(id)) {
    res.send('Pet has been deleted');
    return;
  }

  res.status(404).send('Pet not found');
});

/* -----End Pet API----- */


/* -----Start User----- API */

app.get('/users', async (req, res) => {
  res.status(200).json(await getUsers());
});

app.get('/users/:id', async (req, res) => {
  const id = req.params.id;

  const user = await getUserByID(id);

  if (user) {
    res.status(200).json(user);
    return;
  }

  res.status(404).send('User not found');
});

app.post('/users', async (req, res) => {
  const user = req.body;

  const usersDatabase = await getUserByID(user.id);

  if (usersDatabase) {
    res.status(400).send("The user already exists");
    return;
  }

  const newUser = await insertUser(user);
  if (newUser) {
    res.json(user);
    return;
  }
  res.status(400).send('Failure while creating the user');
});

app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const newUser = req.body;

  if (newUser.id !== id) {
    res.status(400).send('El id del usuario en el body y la URL no es la misma');
    return;
  }

  const user = await getUserByID(id);

  if (user === null || user === undefined) {
    res.status(400).json("The user does not exists");
    return;
  }

  if (await modifyUser(newUser)) {
    res.json(newUser);
    return;
  }

  res.status(404).send('User not found');
});

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;

  if (await deleteUser(id)) {
    res.send('User has been deleted');
    return;
  }

  res.status(404).send('User not found');
});

/* -----End User API----- */

app.listen(port, () => console.log(`API Rest starts at ${port}!`));