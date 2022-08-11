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
        SELECT id, username, "profilePicture"
        FROM users;
    `)
}

async function getPostsByUserId(id){
    return connection.query(`
        SELECT *
        FROM posts
        WHERE posts."userId" = $1;
    `, [id]);
}

async function getUsername(id){
    return connection.query(`
        SELECT username
        FROM users
        WHERE id = $1;
    `, [id]);
}

export const userRepository = {
    addUser,
    getUser,
    getUsersList,
    getPostsByUserId,
    getUsername
}