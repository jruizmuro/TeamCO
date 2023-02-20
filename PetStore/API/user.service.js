import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';

const client = createClient({
    url: 'redis://default:123pass@localhost:5000'
});

await client.connect();

export async function getUsers() {
    const data = await client.get("Users");
    return JSON.parse(data ?? '[]');
}

export async function getUserByID(id) {
    const users = await getUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return users[i];
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

export async function insertUser(user) {
    const users = await getUsers();
    if (users === null || users === undefined) {
        users = [];
    }
    user.id = uuidv4();
    users.push(user);
    await client.set("Users", JSON.stringify(users));
    return user;
}

export async function deleteUser(id) {
    const users = await getUsers();
    const newUsers = users.filter(function (value) {
        return value.id !== id
    });

    if (users.length != newUsers.length) {
        await client.set("Users", JSON.stringify(newUsers));
        return true;
    }
    return false;
}

export async function modifyUser(user) {
    const users = await getUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
            users[i] = user;
            await client.set("Users", JSON.stringify(users));
            return true;
        }
    }
    return false;
}