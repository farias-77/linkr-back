import connection from "../dbStrategy/database.js";

export async function followMiddleware(req, res, next) {

    try {
        const followedId = req.params.id;

        const { rowCount } = await connection.query(`
            SELECT * FROM users WHERE id = $1
        `, [followedId])

        if (!rowCount) {
            return res.sendStatus(209);
        }
        res.locals.followedId = followedId;
        next();
    } catch (error) {
       return res.status(500).send(error.message);
    }
}