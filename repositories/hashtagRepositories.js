import connection from "../dbStrategy/database.js";

async function trendingHashtags(){
    return await connection.query(`
                SELECT hashtags.hashtag
                FROM posts_hashtags
                JOIN hashtags ON hashtags.id = posts_hashtags."hashtagId"
                GROUP BY posts_hashtags."hashtagId", hashtags.hashtag
                ORDER BY COUNT(posts_hashtags."hashtagId") DESC
                LIMIT 10
                `)
}

async function hashtagExist(hashtag){
    return await connection.query(`SELECT id FROM hashtags WHERE hashtag = $1`,[hashtag])
}

async function getHashtagPosts(hashtagId){
    return await connection.query(`
                SELECT users.username, users."profilePicture", posts.url, posts."postText" 
                FROM posts_hashtags
                JOIN posts ON posts.id = posts_hashtags."postId"
                JOIN users ON users.id = posts."userId"
                WHERE posts_hashtags."hashtagId" = $1
                ORDER BY posts.id DESC`,[hashtagId])
}

export const hashtagRepository = {
    trendingHashtags,
    hashtagExist,
    getHashtagPosts
}