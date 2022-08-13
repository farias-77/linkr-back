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