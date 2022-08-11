import { hashtagRepository } from "../repositories/hashtagRepositories.js";

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

        res.send(hashtagPosts);
    }catch(error){
        res.sendStatus(500).send(error.message);
    }
}