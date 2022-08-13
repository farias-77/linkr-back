import urlMetadata from "url-metadata"; 
import connection from "../dbStrategy/database.js";

export async function metadataMiddleware(req, res){
    try{        
        const { url } =  req.body;
        const postId = res.locals.postId;
        
        const metadata = await urlMetadata(url)

        connection.query(`
            INSERT INTO metadata ("postId", title, image, description)
            VALUES ($1, $2, $3, $4)
        `,[postId, metadata.title, metadata.image, metadata.description]);
            

        return;
    }catch(error){
        return res.status(500).send(error.message);
    }
}