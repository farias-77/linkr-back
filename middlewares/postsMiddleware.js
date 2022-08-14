import connection from "../dbStrategy/database.js";
import { registerPostSchema } from "../schemas/postSchema.js";

export async function registerPostMiddleWare(req, res, next) {
    const userId = Number(res.locals.id);
    const post = req.body;
    const data = {
        userId: userId,
        url: post.url,
        text: post.text
    }

    try {

        const { error } = registerPostSchema.validate(data, { abortEarly: false });

        if (error) {
            return res.status(422).send(error.message);
        }

        const { rowCount } = await connection.query(`
            SELECT * FROM users WHERE id = $1
        `, [userId]);
        if (!rowCount) {
            return res.sendStatus(404);
        }

        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function userValidation(req, res, next){
    try{
        const postId = req.params.postId;
        const id = res.locals.id;

        const { rows: post } = await connection.query(`
            SELECT * 
            FROM posts
            WHERE id = $1;
        `, [postId]);

        if(post[0].userId !== id){
            return res.status(401).send("Você não tem autorização para excluir esse post!");
        }

        next();
    }catch(error){
        return res.status(500).send(error.message);
    }
}

export async function deleteLikes(req, res, next){
    try{
        const postId = req.params.postId;

         await connection.query(`
            DELETE FROM likes 
            WHERE "postId" = $1;
        `, [postId]);

        next();
    }catch(error){
        return res.status(500).send(error.message);
    }
}

export async function deleteMetadata(req, res, next){
    try{
        const postId = req.params.postId;

         await connection.query(`
            DELETE FROM metadata 
            WHERE "postId" = $1;
        `, [postId]);

        next();
    }catch(error){
        return res.status(500).send(error.message);
    }
}

export async function deletePosts_Hashtags(req, res, next){
    try{
        const postId = req.params.postId;

         await connection.query(`
            DELETE FROM posts_hashtags   
            WHERE "postId" = $1;
        `, [postId]);

        next();
    }catch(error){
        return res.status(500).send(error.message);
    }
}