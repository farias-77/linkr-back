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

async function getHashtagPosts(hashtagId,limit){
    return await connection.query(`
                SELECT * 
                FROM posts_hashtags
                JOIN posts ON posts.id = posts_hashtags."postId"
                JOIN users ON users.id = posts."userId"
                JOIN metadata ON metadata."postId" = posts.id
                WHERE posts_hashtags."hashtagId" = $1
                ORDER BY posts.id DESC
                LIMIT $2`,[hashtagId,limit])
}

async function getAllHashtags(){
    return await connection.query(`SELECT id, hashtag FROM hashtags`)
}

async function insertHashtag(hashtag){
    return await connection.query(`INSERT INTO hashtags (hashtag) VALUES ($1)`,[hashtag])
}

export const hashtagRepository = {
    trendingHashtags,
    hashtagExist,
    getHashtagPosts,
    getAllHashtags,
    insertHashtag
}