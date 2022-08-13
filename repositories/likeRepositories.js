import connection from "../dbStrategy/database.js";

async function getPostbyId(postId){
    return await connection.query(`SELECT * FROM posts WHERE id=$1`,[postId]);
}

async function isLiked(postId,userId){
    return await connection.query(`SELECT * FROM likes WHERE "postId"=$1 AND "userId"=$2`,[postId,userId]);
}

async function like(postId,userId){
    return await connection.query(`INSERT INTO likes ("postId","userId") VALUES ($1,$2)`,[postId,userId]);
}

async function dislike(postId,userId){
    return await connection.query(`DELETE FROM likes WHERE "postId"=$1 AND "userId"=$2`,[postId,userId]);
}

async function whoLiked(postId){
    return connection.query(`
        SELECT 
            likes.*,
            users.id,
            users.name
        FROM likes
        JOIN users
        ON users.id = likes."userId"
        WHERE likes."postId" = $1;
    `, [postId]);
}


export const likeRepository = {
    getPostbyId,
    isLiked,
    like,
    dislike,
    whoLiked
}