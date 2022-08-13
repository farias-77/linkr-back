import connection from "../dbStrategy/database.js";
import { metadataMiddleware } from "../middlewares/metadataMiddleware.js";
import dotenv from "dotenv";
import { hashtagVerifier } from "../utils/hashtagVerifier.js";

dotenv.config();

export async function registerPost(req, res) {
    const {url, text} =  req.body;
    const userId = res.locals.id;
    
    try {
        await connection.query(`
            INSERT INTO posts ("userId", url, "postText")
            VALUES ($1, $2, $3)
        `, [userId, url, text]);
        
        const {rows: posts} = await connection.query(`
            SELECT * 
            FROM posts
            ORDER BY "createdAt" DESC
            LIMIT 1;
        `);
        
        await metadataMiddleware(url, posts[0].id);

        const hashtags = await hashtagVerifier(text);

        if (hashtags.length > 0) {
            await hashtags.map(hashtag => 
                connection.query(`
                    INSERT INTO posts_hashtags ("postId", "hashtagId")
                    VALUES ($1, $2)
                `, [posts[0].id, hashtag])
            )
        }

        return res.sendStatus(201);
    } catch (error){ 
        return res.status(500).send(error.message);
    }
}