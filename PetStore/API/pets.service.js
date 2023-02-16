import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';

const client = createClient({
  url: 'redis://default:123pass@localhost:5000'
});

await client.connect();


export async function getPets() {
  const data = await client.get("Pets");
  return JSON.parse(data ?? '[]');
}

export async function getPetByID(id) {
  const pets = await getPets();
  for (let i = 0; i < pets.length; i++) {
    if (pets[i].id === id) {
      return pets[i];
    }
  }
  return null;
}

// export async function getCarByNumBastidor(numBastidor) {
//   const cars = await getCars();
//   for (let i = 0; i < cars.length; i++) {
//     if (cars[i].numBastidor === numBastidor) {
//       return cars[i];
//     }
//   }
//   return null;
// }

export async function insertPet(pet) {
  const pets = await getPets();
  if (pets === null || pets === undefined) {
    pets = [];
  }
  pet.id = uuidv4();
  pets.push(pet);
  await client.set("Pets", JSON.stringify(pets));
  return pet;
}

export async function deletePet(id) {
  const pets = await getPets();
  const newPets = pets.filter(function (value) {
    return value.id !== id
  });

  if (pets.length != newPets.length) {
    await client.set("Pets", JSON.stringify(newPets));
    return true;
  }
  return false;
}

export async function modifyPet(pet) {
  const pets = await getPets();
  for (let i = 0; i < pets.length; i++) {
    if (pets[i].id === pet.id) {
      pets[i] = pet;
      await client.set("Pets", JSON.stringify(pets));
      return true;
    }
  }
  return false;
}

