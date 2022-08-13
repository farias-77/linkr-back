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
            res.sendStatus(200);
        }else{
            await likeRepository.like(postId,userId);
            res.sendStatus(200);
        }
    }catch(error){
        res.status(500).send(error.message);
    }

}

export async function getWhoLiked(req,res){
    try{
        const postId = Number(req.params.postId);
        const { rows: whoLiked } = await likeRepository.whoLiked(postId);

        return res.send(whoLiked);
    }catch(error){
        res.status(500).send(error.message);
    }

}