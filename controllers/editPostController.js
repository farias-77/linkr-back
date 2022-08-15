import connection from "../dbStrategy/database";

export async function editPost(req, res) {
    try {
        const postId = req.params.id;
        const text = req.params.text;

        await connection.query(`
            UPDATE posts SET text=$1 WHERE id = $2
        `, [postId, text])
    }
}