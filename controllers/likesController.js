import { likeRepository } from "../repositories/likeRepositories.js";

export async function likeOrDislike(req,res){
    const userId = res.locals.id;
    const postId = Number(req.params.postId);
    try{
        const possiblePost = await likeRepository.getPostbyId(postId);
        if(possiblePost.rowCount === 0){
            res.sendStatus(404);
        }
        const isLiked = await likeRepository.isLiked(postId,userId);
        if(isLiked.rowCount !== 0){
            await likeRepository.dislike(postId,userId);
            
            const { rows: whoLiked } = await likeRepository.whoLiked(postId);
            const response = whoLiked.map(object => {return object.username});

            res.status(200).send(response);
        }else{
            await likeRepository.like(postId,userId);
            
            const { rows: whoLiked } = await likeRepository.whoLiked(postId);
            const response = whoLiked.map(object => {return object.username});

            res.status(200).send(response);
        }
    }catch(error){
        res.status(500).send(error.message);
    }

}

export async function getLikesList(req, res){
    const postId = Number(req.params.postId);
    try{
        const { rows: whoLiked } = await likeRepository.whoLiked(postId);
        const response = whoLiked.map(object => {return object.username});

        res.status(200).send(response);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}