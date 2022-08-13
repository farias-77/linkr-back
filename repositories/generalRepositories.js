import connection from "../dbStrategy/database.js";


async function getPostsLikes(postId){
    return await connection.query(`
                SELECT users.username FROM likes
                JOIN users ON users.id = likes."userId"
                JOIN posts ON posts.id = likes."postId"
                WHERE posts.id = $1
                `,[postId]);
}

export const generalRepository = {
    getPostsLikes
}