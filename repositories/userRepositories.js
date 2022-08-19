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

async function getPostsByUserId(id,limit){
    return connection.query(`
        SELECT *
        FROM posts
        JOIN metadata ON posts.id = metadata."postId"
        JOIN users ON users.id = posts."userId"
        WHERE posts."userId" = $1
        ORDER BY posts.id DESC
        LIMIT $2;
    `, [id,limit]);
}

async function getUsername(id){
    return connection.query(`
        SELECT username, "profilePicture"
        FROM users
        WHERE id = $1;
    `, [id]);
}

async function checkUsername(username){
    return connection.query(`SELECT * FROM users WHERE username = $1;`,
    [username]);
}

async function getUserById(id){
    return await connection.query(`
        SELECT username FROM users WHERE id = $1;
    `, [id]);
}

async function getFollowedByUser(userId){
    return await connection.query(`
    SELECT follows."followedId" as id FROM users 
    JOIN follows ON follows."followerId" = users.id
    WHERE users.id = $1;
`, [userId]);
}

async function getUserFollows(id){
    return await connection.query(`
        SELECT "followedId" as "id"
        FROM follows
        WHERE "followerId" = $1;
    `, [id]);
}

export const userRepository = {
    addUser,
    getUser,
    getUsersList,
    getPostsByUserId,
    getUsername,
    checkUsername,
    getUserById,
    getFollowedByUser,
    getUserFollows
}