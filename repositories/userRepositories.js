import connection from "../dbStrategy/database.js";

async function addUser(email, password, username, userPicture) {
    return connection.query(
        `INSERT INTO users (
            email,
            password,
            username,
            "userPicture")
        VALUES ($1, $2, $3, $4);`,
        [email, password, username, userPicture]
    );
}

async function getUser(email) {
    return connection.query(
        `SELECT * FROM users WHERE email = $1;`,
        [email]
    );
}

export const userRepository = {
    addUser,
    getUser
}