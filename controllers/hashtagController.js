import { hashtagRepository } from "../repositories/hashtagRepositories.js";
import { getPostsLikes } from "../utils/getLikes.js";

export async function getTrendingHashtags(req,res){
    try{
        const { rows: trendingHashtags} = await hashtagRepository.trendingHashtags();
        res.status(200).send(trendingHashtags);
    }catch(error){
        res.sendStatus(500).send(error.message);
    }
}

export async function getSingleHashtag(req,res){
    const hashtag = req.params.hashtag;
    try{
        const possibleHashtag = await hashtagRepository.hashtagExist(hashtag);
        if(possibleHashtag.rowCount === 0){
            return res.status(404).send([]);
        }
        const { id: hashtagId} = possibleHashtag.rows[0];
        
        const {rows: hashtagPosts} = await hashtagRepository.getHashtagPosts(hashtagId); 
        const hashtagPostsWLikes= await getPostsLikes(hashtagPosts);

        return res.status(200).send(hashtagPostsWLikes);
    }catch(error){
        res.sendStatus(500).send(error.message);
    }
}