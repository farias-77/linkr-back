import connection from "../dbStrategy/database.js";

async function addUser(email, password, username, profilePicture) {
    return connection.query(
        `INSERT INTO users (
            email,
            password,
            username,
            "profilePicture")
        VALUES ($1, $2, $3, $4);`,
        [email, password, username, profilePicture]
    );
}

async function getUser(email) {
    return connection.query(
        `SELECT * FROM users WHERE email = $1;`,
        [email]
    );
}

async function getUsersList(){
    return connection.query(`
        SELECT *
        FROM users;
    `)
}

export const userRepository = {
    addUser,
    getUser,
    getUsersList
}