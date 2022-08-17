import connection from "../dbStrategy/database.js";

async function insertRepost(userId, url, text, isRepost, repostUserId){
    return await connection.query(
    `
        INSERT INTO posts ("userId", url, "postText", "isRepost", "repostUserId")
        VALUES ($1, $2, $3, $4, $5);
    `,
    [userId, url, text, isRepost, repostUserId]);
}

async function getRepostByUserId(userId){
    return await connection.query(
    `
        SELECT posts.*, users.username
        FROM posts
        JOIN users
        ON posts."userId" = users.id
        WHERE posts."postId" = $1;
    `,
    [userId]);
}

async function countReposts(postId) {
    
}

export const repostRepository = {
    insertRepost,
    getRepostByUserId,
    countReposts
}