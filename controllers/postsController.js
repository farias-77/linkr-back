import connection from "../dbStrategy/database.js";
import { metadataMiddleware } from "../middlewares/metadataMiddleware.js";
import dotenv from "dotenv";

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


        return res.sendStatus(201);
    } catch (error){ 
        return res.status(500).send(error.message);
    }
}