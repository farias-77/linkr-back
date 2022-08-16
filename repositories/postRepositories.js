import connection from "../dbStrategy/database.js";

async function insertPost(userId, url, text, isRepost, repostUserId){
    return await connection.query(`
            INSERT INTO posts ("userId", url, "postText", "isRepost", "repostUserId")
            VALUES ($1, $2, $3, $4, $5);
            `, [userId, url, text, isRepost, repostUserId]);
}

async function selectLastPost(){
    return await connection.query(`
                SELECT * 
                FROM posts
                ORDER BY "createdAt" DESC
                LIMIT 1;
                `);
}

async function relatePostWHashtag(postId,hashtagId){
    return connection.query(`
                    INSERT INTO posts_hashtags ("postId", "hashtagId")
                    VALUES ($1, $2)
                    `, [postId, hashtagId])
}

async function deletePost(postId){
    return await connection.query(`
                    DELETE FROM posts
                    WHERE id = $1;
                    `, [postId]);
}

async function getTimelinePosts(){
    return await connection.query(`
                SELECT * 
                FROM posts
                JOIN users ON users.id = posts."userId"
                JOIN metadata ON metadata."postId" = posts.id
                ORDER BY posts.id DESC
                LIMIT 20`)
}

async function updatePost(postId, text) {
    return await connection.query(`
                    UPDATE posts SET "postText"=$1 WHERE id = $2
                `, [text, postId])
}

async function insertComment(postId, userId, comment){
    return await connection.query(`
        INSERT INTO comments ("userId", "postId", "comment")
        VALUES ($1, $2, $3);
    `, [userId, postId, comment]);
}

async function getCommentsByPostId(postId){
    return await connection.query(`
        SELECT comments.*, users.username, users."profilePicture"
        FROM comments
        JOIN users
        ON comments."userId" = users.id
        WHERE comments."postId" = $1;
    `, [postId]);
}

export const postRepository = {
    insertPost,
    selectLastPost,
    relatePostWHashtag,
    deletePost,
    getTimelinePosts,
    updatePost,
    insertComment, 
    getCommentsByPostId
}